const fs = require('fs');
const path = require('path');

const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const Follow = require('../models/Follow');
const BoostItem = require('../models/BoostItem');
const History = require('../models/BoostPurchaseHistory');
const ReferralLink = require('../models/ReferralLink');

const logger = require('../helper/logger');
const { BONUS, TELEGRAM, LEADERBOARD_SHOW_USER_COUNT } = require('../helper/constants');
const { isUserTGJoined } = require('../helper/botHelper');

const { verifyTransaction } = require('../helper/transaction');

const getUser = async (req, res) => {
  const { userid } = req.params;
  const user = await User.findOne({ userid });
  await user.updateEnergy();
  res.status(StatusCodes.OK).json(user);
}

const getAllFriends = async (req, res) => {
  const { userid } = req.params;
  if(!userid) {
    logger.error(`cannot find userid=${userid}`);
    return res.status(StatusCodes.OK).json({});
  }
  const user = await User.findOne({ userid }).populate('friends').select('friends');

  res.status(StatusCodes.OK).json(user);
};

const getAllUserCount = async (req, res) => {
  const userCount = await User.countDocuments();
  res.status(StatusCodes.OK).json({count: userCount});
};


// task part
const checkTask = async (req, res) => {
  const { userid, linkid, payload } = req.body;

  var user = await User.findOne({ userid }).populate('referrals.item');
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no userid!'});
  }

  const exists = user.referrals.some(ref => (ref.item.linkid == linkid && ref.finished == true));
  if(exists) {
    return res.status(StatusCodes.OK).json({success: false, status: 'exist', msg: 'Already received!'});
  }

  var follow = await Follow.findOne({ userid, referralid:linkid });
  if(!follow) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nofollow', msg: 'Not completed yet!'});
  }

  var referral = await ReferralLink.findOne({ linkid });
  if(!referral) {
    return res.status(StatusCodes.OK).json({success: false, status: 'noreferral', msg: 'There is no referral link!'});
  }

  if(referral.type == "own_tg_channel" || referral.type == "own_tg_group" || referral.type == "partner_tg_channel") {
    const isTGJoined = await isUserTGJoined(userid, referral.chatid);
    if(!isTGJoined) {
      return res.status(StatusCodes.OK).json({success: false, status: 'notjoin', msg: `not joined telegram yet!`});
    }
  } else if(referral.type == "wallet_connect") {
    follow.payload = payload;
    await follow.save();
  } else if(referral.type == "social") {
    follow.payload = payload;
    await follow.save();
  }
  
  user.referrals.push({
    item: referral,
    finished: true,
  });
  user.addOnion(referral.bonus);
  await user.save();
  return res.status(StatusCodes.OK).json({success: true, status: 'success', msg: referral.completedMsg, onion: user.onion, bonus: referral.bonus});
}
const doTask = async (req, res) => {
  const { userid, linkid } = req.body;

  var follow = await Follow.findOne({ userid, referralid: linkid });
  if(follow) {
    return res.status(StatusCodes.OK).json({success: false, status: 'exist', msg: 'Already added!'});
  }
  follow = await Follow.create({
    userid,
    referralid: linkid
  });
  return res.status(StatusCodes.OK).json({success: true});
};
const getAllTaskList = async (req, res) => {
  const referrals = await ReferralLink.find({ visible: true });
  return res.status(StatusCodes.OK).json({ referrals });
}
const getMyTaskList = async (req, res) => {
  const { userid } = req.params;
  var user = await User.findOne({ userid }).populate('referrals.item');
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'There is no userid!'});
  }
  return res.status(StatusCodes.OK).json({ myReferrals: user.referrals });
}

const getAvatarImage = (req, res) => {
  const { userid } = req.params;
  const url = path.join(__dirname, '..', 'uploads/avatars', userid + '.jpg');
  const isExist = fs.existsSync(url);
  if (isExist) {
    res.sendFile(url);
  }
  else res.sendFile(path.join(__dirname, '..', 'uploads/avatars', 'default.png'));
}

const claimDailyReward = async (req, res) => {
  const oneDay = 24 * 60 * 60 * 1000;
  try {
    const { userid } = req.body;
    const user = await User.findOne({ userid });

    if (!user) {
      return res.status(StatusCodes.OK).json({ success: false, status: 'nouser', msg: 'Can not find user!' });
    }

    const now = new Date();
    const lastRewardDate = user.lastRewardDate || new Date(0);

    const timeSinceLastReward = now - lastRewardDate;
    
    const isConsecutiveDay = timeSinceLastReward < 2 * oneDay;
    user.rewardStreak = isConsecutiveDay ? (user.rewardStreak + 1) : 1;
    const reward = BONUS.DAILY_REWARD * user.rewardStreak;

    var status = 'notyet';
    if (timeSinceLastReward >= oneDay) {
      user.addOnion(reward);
      user.lastRewardDate = now;
      if(req.body.status == 1) {
        await user.save();
        status = 'success';
        console.log('Daily reward claimed successfully');
      }

      return res.status(StatusCodes.OK).json({ 
        success: true,
        status,
        reward,
        ms: req.body.status == 1 ? oneDay : 0,
      });
    } else {
      const ms = oneDay - timeSinceLastReward;
      return res.status(StatusCodes.OK).json({ success: true, ms, status, reward });
    }
  } catch (error) {
    console.error('Error claiming daily reward:', error);
    return res.status(StatusCodes.OK).json({ success: false, status: 'error', msg: 'Server unknown error!' });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const { userid, type } = req.params;
    var users = [];
    const self = await User.findOne({ userid }).select('-password');
    var rank = -1; 
    if (type == "week"){
      users = await User.find({}).sort({ weeklyScore: -1 }).limit(LEADERBOARD_SHOW_USER_COUNT).select('-password');
      rank = await User.countDocuments({ weeklyScore: { $gt: self.weeklyScore } });
    } else if (type == "month"){
      users = await User.find({}).sort({ monthlyScore: -1 }).limit(LEADERBOARD_SHOW_USER_COUNT).select('-password');
      rank = await User.countDocuments({ monthlyScore: { $gt: self.monthlyScore } });
    } else if (type == "total"){
      users = await User.find({}).sort({ totalScore: -1 }).limit(LEADERBOARD_SHOW_USER_COUNT).select('-password');
      rank = await User.countDocuments({ totalScore: { $gt: self.totalScore } });
    }
    return res.status(StatusCodes.OK).json({users, rank:rank+1, self});

  } catch(error){
    console.log("getLeaderboard error=", error);
  }
}

const updateUserByTap = async (req,res) =>{
  const {userid} = req.body;
  var user = await User.findOne({userid}).select('-password');
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'Not found user!'});
  }
  if(user.energy < user.loseEnergyPerTap) {
    return res.status(StatusCodes.OK).json({success: false, status: 'noenergy', msg: 'There is no energy!'});
  }

  user.addOnion(user.earnPerTap);
  user.energy -= user.loseEnergyPerTap;
  if(user.energy < 0) {
    user.energy = 0;
  }
  user.lastEnergyUpdate = Date.now();
  await user.save();

  return res.status(StatusCodes.OK).json({success: true, onion: user.onion, energy: user.energy});
}

const growUp = async (req,res) => {
  const {userid} = req.body;
  var user = await User.findOne({userid}).select('-password');
  if(!user) {
    return res.status(StatusCodes.OK).json({success: false, status: 'nouser', msg: 'Not found user!'});
  }

  if (user.energy < user.maxEnergy){
    const addValue = await user.calcEnergyInc();
    user.energy += addValue; 
    user.lastEnergyUpdate = Date.now();
  }
  await user.save();
  
  return res.status(StatusCodes.OK).json({success: true, energy: user.energy});
}

module.exports = {
  getUser,
  getAllFriends,
  getLeaderboard,
  getAllUserCount,
  
  checkTask,
  doTask,
  getAllTaskList,
  getMyTaskList,

  getAvatarImage,

  claimDailyReward,
  updateUserByTap,
  growUp,
};
