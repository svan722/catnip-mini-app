const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const logger = require('../helper/logger');
const { createJWT } = require('../utils/jwt');

const login = async (req, res) => {
  const { userid } = req.body;

  if (!userid) {
    logger.error('authController login not found userid');
    return res.status(StatusCodes.BAD_REQUEST).json('Please provide userid');
  }

  var user = await User.findOne({ userid });
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json('there is no user');
  }

  const token = createJWT({ payload: { userid: user.userid, username: user.username } });
  res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  login,
};
