const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require('../controllers/orderController');
const { protect, supplier } = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, supplier, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, supplier, updateOrderToDelivered);

module.exports = router;