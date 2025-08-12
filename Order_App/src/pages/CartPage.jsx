

import { useState, useEffect } from 'react';
import { getProducts, createOrder, getMyOrders } from '../api';
import { motion } from 'framer-motion';


const CartPage = () => {
  // Cart state (local, since no user system)
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Fetch products and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await getProducts();
        setProducts(prodRes.data);
        const orderRes = await getMyOrders();
        setOrders(orderRes.data);
      } catch (err) {
        setProducts([]);
        setOrders([]);
      }
    };
    fetchData();
  }, []);

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product._id === product._id);
      if (idx !== -1) {
        // Already in cart, increase quantity
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setAlertMessage(`${product.name} added to cart!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  // Update quantity
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => item.product._id === productId ? { ...item, quantity: newQty } : item));
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  // Checkout (create order)
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const items = cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    try {
      await createOrder({ items, totalPrice });
      setAlertMessage('Order placed successfully!');
      setShowAlert(true);
      setCart([]);
      // Refresh orders
      const orderRes = await getMyOrders();
      setOrders(orderRes.data);
    } catch (err) {
      setAlertMessage('Failed to place order.');
      setShowAlert(true);
    }
    setTimeout(() => setShowAlert(false), 2000);
  };


  // Cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 250 : 0;
  const discount = subtotal * 0.02;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      {showAlert && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg max-w-md"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>{alertMessage}</p>
            <button
              className="ml-4 text-green-700 hover:text-green-900"
              onClick={() => setShowAlert(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
      <div className="container mx-auto px-4 py-8 mt-28">
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Shopping Cart
        </motion.h1>
        <p className="text-gray-600 mb-8">Add products to your cart, checkout to place an order, and view your order history below.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cart Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
              {products.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No products found.</div>
              ) : (
                <ul>
                  {products.map(product => (
                    <li key={product._id} className="flex justify-between items-center border-b py-3">
                      <div>
                        <span className="font-medium">{product.name}</span> <span className="text-gray-500">(LKR {product.price})</span>
                      </div>
                      <button
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                        onClick={() => handleAddToCart(product)}
                      >Add to Cart</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">Your cart is empty.</div>
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200">
                    <div className="col-span-5 font-semibold text-gray-700">Product</div>
                    <div className="col-span-2 font-semibold text-gray-700 text-center">Price</div>
                    <div className="col-span-3 font-semibold text-gray-700 text-center">Quantity</div>
                    <div className="col-span-2 font-semibold text-gray-700 text-right">Total</div>
                  </div>
                  {cart.map(item => (
                    <div key={item.product._id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
                      <div className="col-span-5">{item.product.name}</div>
                      <div className="col-span-2 text-center">LKR {item.product.price.toFixed(2)}</div>
                      <div className="col-span-3 flex items-center justify-center">
                        <button className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300" onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300" onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="col-span-2 text-right">LKR {(item.product.price * item.quantity).toFixed(2)}</div>
                      <div className="col-span-12 text-right mt-2">
                        <button className="text-red-500 hover:text-red-700 text-sm" onClick={() => handleRemoveFromCart(item.product._id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-6 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">LKR {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-gray-900 font-medium">LKR {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount (2%)</span>
                      <span className="text-green-600 font-medium">- LKR {discount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-gray-900 font-bold">Total</span>
                      <span className="text-gray-900 font-bold text-xl">LKR {total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition duration-300" onClick={handleCheckout}>Checkout</button>
                </>
              )}
            </div>
          </div>
          {/* Order History Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No orders found.</div>
              ) : (
                <ul>
                  {orders.map(order => (
                    <li key={order._id} className="mb-6 border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Order #{order._id.slice(-5)}</span>
                        <span className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-gray-700 mb-2">Total: <span className="font-bold">LKR {order.totalPrice}</span></div>
                      <div className="text-gray-500 text-sm">{order.items.length} item(s): {order.items.map(i => i.quantity + 'x').join(' ')}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;