const express = require('express');
const router = express.Router();
const { getCart, addToCart } = require('../controllers/cartController');

router.route('/').get(getCart).post(addToCart);

module.exports = router;