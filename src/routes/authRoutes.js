const express = require('express');
const { register, login } = require('../controllers/authController'); // make sure these exist
const router = express.Router();

// Auth endpoints
router.post('/register', register);
router.post('/login', login);

module.exports = router;
