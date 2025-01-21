const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
    token = req.headers.authorization.split(' ')[1]; // Get the token from the Bearer header
    const decoded = jwt.verify(token, 'restaurantjwt'); // Verify token with manual secret key

      req.user = await User.findById(decoded.id).select('-password'); // Get user data
      next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).json({ error: "Not authorized, invalid token" });
      }
    } else {
      return res.status(401).json({ error: "Not authorized, no token" });
    
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = authMiddleware;
