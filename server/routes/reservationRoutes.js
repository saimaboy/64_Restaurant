const express = require('express');
const { createReservation } = require('../controllers/Reservations');
const router = express.Router();

router.post('/', createReservation);

module.exports = router;
