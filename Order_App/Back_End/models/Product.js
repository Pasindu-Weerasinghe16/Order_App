const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['fruits', 'snacks', 'meat', 'packaged', 'bakery', 'other'],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discounted: {
      type: Boolean,
      required: true,
      default: false,
    },
    discountPrice: {
      type: Number,
      required: function() {
        return this.discounted;
      },
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'g', 'lb', 'oz', 'piece', 'pack', 'liter', 'ml'],
      default: 'kg',
    },
    isFlashSale: {
      type: Boolean,
      default: false,
    },
    flashSaleEnds: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;