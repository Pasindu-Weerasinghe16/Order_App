const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
  const { items, totalPrice } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    user: req.user._id,
    items,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

module.exports = {
  addOrderItems,
  getMyOrders
};