const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpires, refreshTokenExpires } = require('../config/auth');

exports.generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpires });
  const refreshToken = jwt.sign({ id: userId }, jwtSecret, { expiresIn: refreshTokenExpires });
  return { accessToken, refreshToken };
};
