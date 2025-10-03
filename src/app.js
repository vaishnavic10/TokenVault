const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const { generalLimiter, authLimiter } = require('./middlewares/rateLimiter');

const app = express();

app.use(express.json());

app.use(generalLimiter);
app.use('/api/auth', authLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
