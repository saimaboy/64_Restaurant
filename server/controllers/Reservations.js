const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
  try {
    const { name, date, time, guests, phone } = req.body;

    if (!name || !date || !time || !guests || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newReservation = new Reservation({ name, date, time, guests, phone });
    await newReservation.save();

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { createReservation };
