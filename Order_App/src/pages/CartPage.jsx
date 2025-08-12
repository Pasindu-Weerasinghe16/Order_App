import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart, createOrder, getProductById } from '../api';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const deliveryFee = 250.0;

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCartItems(
          res.data.items.map(item => ({
            id: item.product._id,
            name: item.product.name,
            image: '',
            price: item.product.price,
            quantity: item.quantity,
            category: item.product.category
          }))
        );
      } catch (err) {
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);

  // Add product to cart (call this from your product page or card)
  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const productRes = await getProductById(productId);
      await addToCart(productId, quantity);
      const res = await getCart();
      setCartItems(
        res.data.items.map(item => ({
          id: item.product._id,
          name: item.product.name,
          image: '',
          price: item.product.price,
          quantity: item.quantity,
          category: item.product.category
        }))
      );
      setAlertMessage(`${productRes.data.name} added to cart!`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } catch (err) {
      setAlertMessage('Failed to add product to cart.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.02; // 2% discount
  const total = subtotal + deliveryFee - discount;

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(id, newQuantity);
      setCartItems(
        cartItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setAlertMessage('Failed to update quantity.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const removeItem = async id => {
    try {
      await removeFromCart(id);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setAlertMessage('Failed to remove item.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
    } catch (err) {
      setAlertMessage('Failed to clear cart.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const proceedToCheckout = async () => {
    if (cartItems.length === 0) {
      setAlertMessage('Your cart is empty. Please add items before checkout.');
      setShowAlert(true);
      return;
    }
    try {
      const items = cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price
      }));
      const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await createOrder({ items, totalPrice });
      setAlertMessage('Order placed successfully!');
      setShowAlert(true);
      await clearCart();
      setCartItems([]);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (err) {
      setAlertMessage('Failed to place order.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      {/* Alert Notification */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-28">
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Your Shopping Cart
        </motion.h1>
        <p className="text-gray-600 mb-8">Review and manage your items</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-gray-500">Start adding some delicious items to your cart!</p>
                  <div className="mt-6">
                    <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg">
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200">
                    <div className="col-span-6 font-semibold text-gray-700">Product</div>
                    <div className="col-span-2 font-semibold text-gray-700 text-center">Price</div>
                    <div className="col-span-2 font-semibold text-gray-700 text-center">Quantity</div>
                    <div className="col-span-2 font-semibold text-gray-700 text-right">Total</div>
                  </div>

                  {cartItems.map(item => (
                    <motion.div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 py-6 border-b border-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {/* Placeholder for product image */}
                          <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name || item.id}</div>
                          <div className="text-gray-500 text-sm">{item.category}</div>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <span className="text-gray-900 font-medium">LKR {item.price.toFixed(2)}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
                        <span className="text-gray-900 font-medium">LKR {(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          className="ml-4 text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-6 flex justify-between">
                    <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" onClick={handleClearCart}>
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
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

              <button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg transition duration-300"
                onClick={proceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;