const User = require('../models/User');
const passwordUtils = require('../utils/passwordUtils');
const tokenService = require('./tokenService');

exports.register = async ({ name, email, password }) => {
  const hashedPassword = await passwordUtils.hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await passwordUtils.comparePassword(password, user.password)))
    throw new Error('Invalid credentials');
  const tokens = tokenService.generateTokens(user._id);
  return tokens;
};
