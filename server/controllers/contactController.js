const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error saving contact message:", error.message);
    res.status(500).json({ error: "Server error. Try again later." });
  }
};

module.exports = { createContact };
