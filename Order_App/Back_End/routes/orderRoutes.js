const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/orderController');

// REMOVE the protect middleware
router.route('/').post(addOrderItems);
router.route('/myorders').get(getMyOrders);

module.exports = router;