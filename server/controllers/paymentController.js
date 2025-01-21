const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const payment = new Payment({
      userId,
      items,
      totalAmount,
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment', error: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('userId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};

module.exports = { createPayment, getPayments };
