const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user details (protected route)
router.get('/me', authMiddleware, getUserDetails);

module.exports = router;
