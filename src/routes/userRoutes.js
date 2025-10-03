const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { getAllUsers } = require('../controllers/userController'); // make sure this exists
const router = express.Router();

// Protect routes with authentication & authorization
router.get('/', authenticate, authorize('admin'), getAllUsers);

module.exports = router;
