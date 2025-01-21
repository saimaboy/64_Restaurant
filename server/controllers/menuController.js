const Menu = require("../models/Menu");

// Get all menu items
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items", error: error.message });
  }
};

// Add a new menu item
const addMenuItem = async (req, res) => {
  const { name, price, description, image, reviews, rating } = req.body;

  try {
    const newMenuItem = new Menu({
      name,
      price,
      description,
      image,
      reviews,
      rating,
      category,
    });

    const savedItem = await newMenuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to add menu item", error: error.message });
  }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to update menu item", error: error.message });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete menu item", error: error.message });
  }
};

module.exports = { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem };
