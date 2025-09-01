const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});


const orderSchema = mongoose.Schema({
  items: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true
  },
  userEmail: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);