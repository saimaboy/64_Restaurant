const Delivery = require('../models/Delivery'); // Assuming Delivery model exists

// Save delivery and payment details
const saveDeliveryDetails = async (req, res) => {
  try {
    const { deliveryDetails, cartItems, totalAmount } = req.body;

    // Save details to the database
    const delivery = new Delivery({
      deliveryDetails,
      cartItems,
      totalAmount,
    });
    await delivery.save();

    res.status(201).json({ message: 'Delivery and payment details saved successfully!' });
  } catch (error) {
    console.error('Error saving delivery details:', error);
    res.status(500).json({ error: 'Failed to save delivery and payment details.' });
  }
};

module.exports = { saveDeliveryDetails };
