const express = require('express');
const {
  authUser,
  registerUser,
  registerSupplier,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/register-supplier', registerSupplier);
router.get('/profile', protect, getUserProfile);

module.exports = router;