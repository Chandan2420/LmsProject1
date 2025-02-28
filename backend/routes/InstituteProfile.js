const express = require("express");
const router = express.Router();
const Institute = require("../models/InstituteModel"); // Adjust the path as needed

// Get a specific institute by _id
router.get("/InstituteProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const institute = await Institute.findById(id);

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    res.status(200).json(institute);
  } catch (error) {
    console.error("Error fetching institute data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
