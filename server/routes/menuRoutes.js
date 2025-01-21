const express = require("express");
const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

// Get all menu items
router.get("/", getMenuItems);

// Add a new menu item
router.post("/", addMenuItem);

// Update a menu item
router.put("/:id", updateMenuItem);

// Delete a menu item
router.delete("/:id", deleteMenuItem);

module.exports = router;
