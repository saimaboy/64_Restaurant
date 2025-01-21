const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  phone: { type: String, required: true, match: /^\d{10}$/ },
});

module.exports = mongoose.model('Reservation', reservationSchema);
