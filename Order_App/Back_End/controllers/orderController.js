const asyncHandler = require('express-async-handler');

// @desc    Get supplier profit analysis
// @route   GET /api/orders/supplier-profit?email=SUPPLIER_EMAIL
const getSupplierProfit = asyncHandler(async (req, res) => {
  const supplierEmail = req.query.email;
  if (!supplierEmail) {
    return res.status(400).json({ error: 'Supplier email required' });
  }
  const Product = require('../models/ProductModel');
  // Get all products by this supplier
  const products = await Product.find({ userEmail: supplierEmail });
  const productMap = {};
  products.forEach(p => { productMap[p._id.toString()] = p; });
  // Get all orders containing these products
  const Order = require('../models/OrderModel');
  const orders = await Order.find({ 'items.product': { $in: Object.keys(productMap) } }).populate('items.product');
  // Calculate profit per product
  const profitByProduct = {};
  let totalProfit = 0;
  orders.forEach(order => {
    (order.items || []).forEach(item => {
      const prod = item.product;
      if (prod && prod.userEmail === supplierEmail) {
        const cost = prod.cost || 0;
        const price = item.price || prod.price || 0;
        const qty = item.quantity || 0;
        const profit = (price - cost) * qty;
        if (!profitByProduct[prod._id]) {
          profitByProduct[prod._id] = {
            productId: prod._id,
            name: prod.name,
            image: prod.image,
            totalSold: 0,
            totalProfit: 0
          };
        }
        profitByProduct[prod._id].totalSold += qty;
        profitByProduct[prod._id].totalProfit += profit;
        totalProfit += profit;
      }
    });
  });
  res.json({
    supplierEmail,
    totalProfit,
    products: Object.values(profitByProduct)
  });
});

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
  // Reduce product stock for each item
  const Product = require('../models/ProductModel');
  for (const item of items) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { stock: -item.quantity } },
      { new: false }
    );
  }
  res.status(201).json(createdOrder);
});

// @desc    Get all orders (since no user)
// @route   GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
  // Get userEmail from query param or req.user (if using auth)
  const userEmail = req.query.userEmail || (req.user && req.user.email);
  const filter = userEmail ? { userEmail } : {};
  // Populate product details for each order item
  const orders = await Order.find(filter).populate('items.product');
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

module.exports = { addOrderItems, getMyOrders, getSupplierProfit };