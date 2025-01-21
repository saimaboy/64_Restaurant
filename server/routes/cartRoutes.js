const express = require('express');
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

// Routes
router.post('/add', addToCart);
router.get('/:userId', getCart);
router.delete('/remove', removeFromCart);
router.delete('/clear/:userId', clearCart);

module.exports = router;
