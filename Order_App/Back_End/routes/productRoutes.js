const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/ProductController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;