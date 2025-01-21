const Cart = require('../models/Cart');

// Add items to the cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existingItem = cart.items.find((item) => item.productId.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    } else {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart items
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find(); // Fetch all cart items
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart, clearCart };
