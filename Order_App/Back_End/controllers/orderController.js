const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
  // Accept either items (legacy) or purchasedProducts (new)
  let { items, purchasedProducts, totalPrice, userEmail } = req.body;

  // If purchasedProducts is provided, map to items for storage
  if (purchasedProducts && Array.isArray(purchasedProducts)) {
    items = purchasedProducts.map(prod => ({
      product: prod.productId,
      quantity: prod.quantity,
      price: prod.price
    }));
  }

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    items,
    totalPrice,
    userEmail: userEmail || '',
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get all orders (since no user)
// @route   GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
  // Populate product details for each order item
  const orders = await Order.find().populate('items.product');
  // Add a simplified purchasedProducts array to each order
  const ordersWithProducts = orders.map(order => {
    const purchasedProducts = (order.items || []).map(it => {
      const p = it.product || {};
      return {
        productId: p._id || it.product,
        name: p.name || '',
        image: p.image || '',
        price: p.price || it.price,
        quantity: it.quantity
      };
    });
    // Return the order as a plain object with purchasedProducts
    const orderObj = order.toObject();
    orderObj.purchasedProducts = purchasedProducts;
    return orderObj;
  });
  res.json(ordersWithProducts);
});

module.exports = { addOrderItems, getMyOrders };