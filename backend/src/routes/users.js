const express = require('express');
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Admin only routes
router.get('/admin/all', adminOnly, userController.getAllUsers);
router.put('/admin/:id/status', adminOnly, userController.updateUserStatus);
router.delete('/admin/:id', adminOnly, userController.deleteUser);

module.exports = router;