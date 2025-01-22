const express = require('express');
const multerConfig = require('../middlewares/multerConfig');

const router = express.Router();

// Example route for uploading files
router.post('/upload', multerConfig.single('file'), (req, res) => {
    try {
        res.status(201).json({ message: 'File uploaded successfully!', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed' });
    }
});

module.exports = router;
