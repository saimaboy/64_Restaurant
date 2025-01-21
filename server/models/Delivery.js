const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  deliveryDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  cartItems: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
