const express = require('express');
const router = express.Router();
const { saveDeliveryDetails } = require('../controllers/deliveryController');

// POST route to save delivery details
router.post('/', saveDeliveryDetails);

module.exports = router;
