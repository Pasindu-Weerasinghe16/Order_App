const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFlashSaleProducts,
} = require('../controllers/ProductController');
const { protect, supplier } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(getProducts).post(protect, supplier, createProduct);
router.route('/flash-sale').get(getFlashSaleProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, supplier, updateProduct)
  .delete(protect, supplier, deleteProduct);

module.exports = router;