module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },
  bcrypt: {
    saltRounds: 10,
  },
  passwordReset: {
    tokenExpiry: 3600000, 
  },
  email: {
    verificationTokenExpiry: 86400000, 
  },
};