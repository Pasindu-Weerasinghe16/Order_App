const express = require('express');
const router = express.Router();
const {
  registerUser,
  registerSupplier,
  loginUser,
  getUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/register-supplier', registerSupplier);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;