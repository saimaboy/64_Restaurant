// models/Promotion.js
const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  validTill: { type: Date, required: true },
});

module.exports = mongoose.model("Promotion", promotionSchema);
