const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');

// @desc    Get all products
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  // If user is authenticated, filter by user; else return all (for admin)
  let filter = {};
  if (req.user) {
    filter.user = req.user._id;
  }
  const products = await Product.find(filter);
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock, unit, discounted, discountPrice } = req.body;
  // Ensure discounted is boolean
  const isDiscounted = discounted === true || discounted === 'true';
  const product = new Product({
    user: req.user._id,
    name,
    description,
    category,
    price,
    stock,
    unit,
    discounted: isDiscounted,
    discountPrice: isDiscounted ? discountPrice : undefined
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
    // Only allow owner to update
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.unit = unit || product.unit;
    // Ensure discounted is boolean
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
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    // Only allow owner to delete
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    await product.remove();
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
  deleteProduct
};

