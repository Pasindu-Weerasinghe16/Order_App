const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

// @desc    Get user cart
// @route   GET /api/cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  
  if (!cart) {
    res.json({ items: [], totalPrice: 0 });
  } else {
    res.json(cart);
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [],
      totalPrice: 0
    });
  }

  const existingItem = cart.items.find(item => item.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  cart.totalPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  await cart.save();
  res.status(201).json(cart);
});

module.exports = {
  getCart,
  addToCart
};