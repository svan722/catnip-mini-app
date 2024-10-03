require('dotenv').config({ path: '../.env' });
const { Bot, session,  InlineKeyboard } = require("grammy");
const fs = require('fs');
const download = require('download');

// database
const connectDB = require('./db/connect');
const User = require('./models/User');
const logger = require('./helper/logger');

const { BONUS } = require('./helper/constants');
const { createJWT } = require('./utils/jwt');

const login = async (userid, username, firstname, lastname, is_premium, inviter) => {
    logger.info(`authlogin userid=${userid}, username=${username}, firstname=${firstname}, lastname=${lastname}, inviter=${inviter}, premium=${is_premium}`);
  
    if (!userid) {
      logger.error('authlogin not found userid');
      return {success: false, msg: 'failed'};
    }
  
    var user = await User.findOne({ userid });
    if (!user) {
      user = await User.create({
        userid,
        username,
        firstname, lastname,
        isPremim: is_premium,
        inviter,
      });
      if(inviter && inviter != '') {
        var inviteUser = await User.findOne({userid: inviter});
        if(inviteUser && !inviteUser.friends.includes(user._id)) {
          logger.info('inviter bonus start')
          inviteUser.friends.push(user._id);

          const calcInviteBonus = (count, is_premium) => {
            var value = is_premium ? BONUS.INVITE_FRIEND_WITH_PREMIUM : BONUS.INVITE_FRIEND;
            if(count < 10) {
                value *= 1;
            } else if(count < 100) {
                value *= 1.3;
            } else if(count < 500) {
                value *= 1.5;
            } else if(count < 1000) {
                value *= 1.8;
            } else {
                value *= 2;
            }
            return Math.floor(value);
          };
          
          const inviteBonus = calcInviteBonus(inviteUser.friends.length, is_premium);
          inviteUser.addOnion(inviteBonus);
          await inviteUser.save();
        }
      }
    }
    const token = createJWT({ payload: { userid, username } });
    return {success: true, token, msg: 'login success'};
};

const botStart = async () => {
    await connectDB(process.env.MONGO_URL);
    const gameBot = new Bot(process.env.BOT_TOKEN);
    const initial = () => {
        return {};
    };
    gameBot.use(session({ initial }));

    gameBot.catch((err) => {
        logger.error(err, "Error in bot:");
        if (err.message.includes("Cannot read properties of null (reading 'items')")) {
            console.log("Detected critical error. Restarting server...");
            // restartServer();
        }
    });

    gameBot.command('start', async (ctx) => {
        const username = ctx.from.username;
        const userid = ctx.from.id;
        const firstname = ctx.from.first_name ? ctx.from.first_name : '';
        const lastname = ctx.from.last_name ? ctx.from.last_name : '';

        const userProfilePhotos = await ctx.api.getUserProfilePhotos(userid, { limit: 1 });
        if (userProfilePhotos.total_count > 0) {
            const fileId = userProfilePhotos.photos[0][0].file_id;
            const file = await ctx.api.getFile(fileId);
            const downloadUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
            await download(downloadUrl).pipe(fs.createWriteStream(`uploads/avatars/${ctx.from.id}.jpg`));
            logger.info(`avatar download url=${downloadUrl}`);
        }

        const isPremium = ctx.from.is_premium || false;
        const inviter = ctx.match;

        const loginRes = await login(userid, username, firstname, lastname, isPremium, inviter);
        if(!loginRes.success) {
            await ctx.reply("Sorry, seems like you don't have any telegram id, set your telegram id and try again.");
            return;
        }
        
        play_url = process.env.APP_URL;
        const link = `${process.env.BOT_LINK}?start=${userid}`;
        const shareText = 'Join our telegram mini app.';
        const invite_fullUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;

        const keyboard = new InlineKeyboard()
            .webApp('🧅 Play Now 🧅', play_url)
            .row()
            .url('🚀 ✖ 🚀', 'https://x.com/TONONION_ONON?t=WKRiaAMa4ZPsfzPpj-g_sg&s=09')
            .url('👬 Join 👬', 'https://t.me/ONON_ANNOUNCEMENT')
            .row()
            .url('🙈 Invite 🙉', invite_fullUrl)

        await ctx.replyWithPhoto(
            process.env.BOT_LOGO,
            {
                caption: 'Welcome to our Cat Nip!',
                reply_markup: keyboard,
            }
        );
        logger.info(`${ctx.from.first_name}#${ctx.from.id} command 'start'`);
    });

    (async () => {
        await gameBot.api.deleteWebhook();
        gameBot.start();
        logger.info('Game Command Bot started!');
    })();
}

botStart();