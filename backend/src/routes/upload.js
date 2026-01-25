const express = require('express');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }

  res.json({
    success: true,
    imageUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
