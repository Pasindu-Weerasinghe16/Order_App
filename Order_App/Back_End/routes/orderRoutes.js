const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, getSupplierProfit } = require('../controllers/orderController');

// REMOVE the protect middleware
router.route('/').post(addOrderItems);

// Supplier profit analysis
router.route('/supplier-profit').get(getSupplierProfit);
router.route('/myorders').get(getMyOrders);

module.exports = router;