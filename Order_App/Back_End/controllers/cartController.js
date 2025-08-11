
const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/ProductModel');

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

  // Fetch all product prices for items in the cart
  const productIds = cart.items.map(item => item.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const priceMap = {};
  products.forEach(p => { priceMap[p._id.toString()] = p.price; });

  cart.totalPrice = cart.items.reduce((total, item) => {
    const price = priceMap[item.product.toString()] || 0;
    return total + price * item.quantity;
  }, 0);

  await cart.save();
  await cart.populate('items.product');
  res.status(201).json(cart);
});

module.exports = {
  getCart,
  addToCart
};