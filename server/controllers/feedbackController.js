const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error saving feedback:", error.message);
    res.status(500).json({ error: "Server error. Try again later." });
  }
};

module.exports = { createFeedback };
