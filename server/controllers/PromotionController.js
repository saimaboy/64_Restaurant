// controllers/promotionController.js
const Promotion = require("../models/Promotion");

// Add a new promotion
const createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all promotions
const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPromotion, getPromotions };
