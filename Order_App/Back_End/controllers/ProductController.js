const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');

// @desc    Get top 4 suppliers by profit (plus 'Other')
// @route   GET /api/products/supplier-analytics
const getTopSuppliersAnalytics = asyncHandler(async (req, res) => {
  // Aggregate total profit by supplier
  const products = await Product.find({});
  const profitBySupplier = {};
  products.forEach(prod => {
    const profit = (prod.price - (prod.cost || 0)) * (prod.stock || 0); // Simplified profit calc
    if (!profitBySupplier[prod.userEmail]) profitBySupplier[prod.userEmail] = 0;
    profitBySupplier[prod.userEmail] += profit;
  });
  // Sort suppliers by profit
  const sorted = Object.entries(profitBySupplier)
    .sort((a, b) => b[1] - a[1]);
  const top4 = sorted.slice(0, 4);
  const otherTotal = sorted.slice(4).reduce((sum, [, profit]) => sum + profit, 0);
  const result = top4.map(([email, profit]) => ({ email, profit }));
  if (sorted.length > 4) result.push({ email: 'Other', profit: otherTotal });
  const totalProfit = sorted.reduce((sum, [, profit]) => sum + profit, 0);
  res.json({ suppliers: result, totalProfit });
});

// @desc    Get analytics for current supplier (latest product, trending product)
// @route   GET /api/products/supplier-analytics/:email
const getSupplierAnalytics = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const products = await Product.find({ userEmail: email });
  const Order = require('../models/OrderModel');
  // Get all orders for this supplier's products
  const productIds = products.map(p => p._id.toString());
  const orders = await Order.find({ 'items.product': { $in: productIds } });
  // Calculate sold quantity for each product from orders
  const soldMap = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const pid = item.product.toString();
      if (productIds.includes(pid)) {
        soldMap[pid] = (soldMap[pid] || 0) + item.quantity;
      }
    });
  });
  // Calculate profits
  const productProfits = products.map(prod => {
    const pid = prod._id.toString();
    const soldQuantity = soldMap[pid] || 0;
    const remainingQuantity = (prod.stock || 0);
    const unitProfit = (prod.price - (prod.cost || 0));
    const currentProfit = unitProfit * soldQuantity;
    const potentialProfit = unitProfit * remainingQuantity;
    return {
      name: prod.name,
      price: prod.price,
      soldQuantity,
      currentProfit,
      potentialProfit,
      createdAt: prod.createdAt
    };
  });
  const totalCurrentProfit = productProfits.reduce((sum, p) => sum + p.currentProfit, 0);
  const totalPotentialProfit = productProfits.reduce((sum, p) => sum + p.potentialProfit, 0);
  // Latest product
  const latestProduct = productProfits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
  // Trending product: highest sold quantity
  const trendingProduct = productProfits.sort((a, b) => b.soldQuantity - a.soldQuantity)[0] || null;
  res.json({
    totalCurrentProfit,
    totalPotentialProfit,
    productProfits,
    latestProduct,
    trendingProduct
  });
});

// @desc    Get all products
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  // No user filter, return all products
  const products = await Product.find({});
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock, unit, discounted, discountPrice } = req.body;
  const isDiscounted = discounted === true || discounted === 'true';
  let imageUrl = '';
  if (req.file) {
    // The image will be served at /uploads/filename
    imageUrl = `/uploads/${req.file.filename}`;
  }
  const userEmail = req.body.userEmail || (req.user && req.user.email ? req.user.email : '');
  const product = new Product({
    name,
    description,
    category,
    price,
    stock,
    unit,
    image: imageUrl,
    discounted: isDiscounted,
    discountPrice: isDiscounted ? discountPrice : undefined,
    userEmail
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock, unit, discounted, discountPrice } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.unit = unit || product.unit;
    const isDiscounted = discounted === true || discounted === 'true';
    product.discounted = discounted !== undefined ? isDiscounted : product.discounted;
    product.discountPrice = isDiscounted ? discountPrice : undefined;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
const mongoose = require('mongoose');
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid product ID');
  }
  const product = await Product.findByIdAndDelete(id);
  if (product) {
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopSuppliersAnalytics,
  getSupplierAnalytics
};

