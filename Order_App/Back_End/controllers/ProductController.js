const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category, discounted } = req.query;
  
  let query = {};
  
  if (category) {
    query.category = category;
  }
  
  if (discounted === 'true') {
    query.discounted = true;
  }
  
  const products = await Product.find(query);
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Supplier
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    price,
    discounted,
    discountPrice,
    stock,
    unit,
    isFlashSale,
    flashSaleEnds,
  } = req.body;

  const product = new Product({
    user: req.user._id,
    name,
    image,
    description,
    category,
    price,
    discounted,
    discountPrice,
    stock,
    unit,
    isFlashSale,
    flashSaleEnds,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Supplier
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    price,
    discounted,
    discountPrice,
    stock,
    unit,
    isFlashSale,
    flashSaleEnds,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this product');
    }

    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.discounted = discounted !== undefined ? discounted : product.discounted;
    product.discountPrice = discountPrice || product.discountPrice;
    product.stock = stock || product.stock;
    product.unit = unit || product.unit;
    product.isFlashSale = isFlashSale !== undefined ? isFlashSale : product.isFlashSale;
    product.flashSaleEnds = flashSaleEnds || product.flashSaleEnds;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Supplier
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this product');
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get flash sale products
// @route   GET /api/products/flash-sale
// @access  Public
const getFlashSaleProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    isFlashSale: true,
    flashSaleEnds: { $gt: Date.now() },
  });
  res.json(products);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFlashSaleProducts,
};