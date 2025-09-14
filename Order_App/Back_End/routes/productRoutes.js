const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopSuppliersAnalytics,
  getSupplierAnalytics
} = require('../controllers/ProductController');
// Supplier analytics endpoints
router.get('/supplier-analytics', getTopSuppliersAnalytics);
router.get('/supplier-analytics/:email', getSupplierAnalytics);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Public CRUD, no protect middleware
router.route('/')
  .get(getProducts)
  .post(upload.single('image'), createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;