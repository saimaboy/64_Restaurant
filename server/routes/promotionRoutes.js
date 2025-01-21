// routes/promotionRoutes.js
const express = require("express");
const { createPromotion, getPromotions } = require("../controllers/PromotionController");
const router = express.Router();

router.post("/", createPromotion); // POST /api/promotions
router.get("/", getPromotions);   // GET /api/promotions

module.exports = router;
