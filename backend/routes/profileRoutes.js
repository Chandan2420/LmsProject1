const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/userModel");

const router = express.Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, "your_jwt_secret", (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
};

// Configure Multer for avatar uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// 📌 **Profile Endpoint (GET Profile)**
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            avatar: user.avatar, // Include avatar in the response
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 **Upload/Update Avatar Endpoint**
router.post("/upload-avatar", authenticateToken, upload.single("avatar"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        // Update user's avatar in the database
        await User.findByIdAndUpdate(req.user.id, { avatar: imageUrl });

        res.json({ message: "Avatar updated successfully", avatar: imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Error uploading avatar" });
    }
});

module.exports = router;
