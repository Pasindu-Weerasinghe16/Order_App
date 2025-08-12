const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    unit: {
      type: String,
      required: true,
      default: 'kg'
    },
    image: {
      type: String,
      required: false
    },
    discounted: {
      type: Boolean,
      default: false
    },
    discountPrice: {
      type: Number
    }
    // ...any other fields...
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);