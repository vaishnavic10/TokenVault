const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/auth');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid token. User not found.' });

    req.user = { id: user._id, email: user.email, role: user.role || 'user' };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ success: false, message: 'Invalid token.' });
    if (error.name === 'TokenExpiredError') return res.status(401).json({ success: false, message: 'Token expired.' });
    next(error);
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Authentication required.' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
    next();
  };
};
