const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Menu item name is required"],
  },
  price: {
    type: Number,
    required: [true, "Menu item price is required"],
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  reviews: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: 0,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
