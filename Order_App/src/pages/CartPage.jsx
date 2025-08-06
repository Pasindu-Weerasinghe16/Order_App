import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 'prod001',
      name: 'Organic Apples',
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      price: 1200.00,
      quantity: 2,
      category: 'fruits'
    },
    {
      id: 'prod002',
      name: 'Fresh Salmon Fillet',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      price: 3200.00,
      quantity: 1,
      category: 'meat'
    },
    {
      id: 'prod003',
      name: 'Artisan Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      price: 850.00,
      quantity: 3,
      category: 'bakery'
    }
  ]);

  const [orderHistory, setOrderHistory] = useState([
    {
      id: 'ORD001',
      date: '2023-11-15',
      items: 5,
      total: 7450.00,
      status: 'Delivered'
    },
    {
      id: 'ORD002',
      date: '2023-11-10',
      items: 3,
      total: 4200.00,
      status: 'Delivered'
    },
    {
      id: 'ORD003',
      date: '2023-11-05',
      items: 7,
      total: 11200.00,
      status: 'Delivered'
    }
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const deliveryFee = 250.00;
  const discount = 500.00;

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const addToCart = () => {
    // This would be your actual implementation to add to MongoDB
    console.log("Adding items to MongoDB database...");
    // Typically you would do something like:
    // fetch('/api/cart', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(cartItems)
    // }).then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      setAlertMessage('Your cart is empty. Please add items before checkout.');
      setShowAlert(true);
      return;
    }

    // Generate a new order ID
    const newOrderId = `ORD${(orderHistory.length + 1).toString().padStart(3, '0')}`;
    
    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    // Create new order
    const newOrder = {
      id: newOrderId,
      date: dateString,
      items: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      total: total,
      status: 'Ongoing',
      itemsDetails: [...cartItems] // Store the cart items for reference
    };

    // Add to order history
    setOrderHistory([newOrder, ...orderHistory]);
    
    // Show success message
    setAlertMessage(`Order #${newOrderId} has been placed successfully! Status: Ongoing`);
    setShowAlert(true);
    
    // Clear the cart (optional - you might want to keep items until payment is confirmed)
    // setCartItems([]);
    
    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
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
                  
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="grid grid-cols-12 gap-4 py-6 border-b border-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* ... (rest of the cart item rendering remains the same) ... */}
                    </motion.div>
                  ))}
                  
                  <div className="pt-6 flex justify-between">
                    <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Continue Shopping
                    </button>
                    <button 
                      className="px-6 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                      onClick={() => setCartItems([])}
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Order History */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Order ID</th>
                      <th className="py-3 px-4 text-left text-gray-700 font-semibold">Date</th>
                      <th className="py-3 px-4 text-center text-gray-700 font-semibold">Items</th>
                      <th className="py-3 px-4 text-right text-gray-700 font-semibold">Total</th>
                      <th className="py-3 px-4 text-center text-gray-700 font-semibold">Status</th>
                      <th className="py-3 px-4 text-center text-gray-700 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-gray-700 font-medium">{order.id}</td>
                        <td className="py-4 px-4 text-gray-600">{order.date}</td>
                        <td className="py-4 px-4 text-center text-gray-600">{order.items}</td>
                        <td className="py-4 px-4 text-right text-gray-900 font-medium">LKR {order.total.toFixed(2)}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button className="text-amber-600 hover:text-amber-700 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-center">
                <button className="px-6 py-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 font-medium">
                  View Full Order History
                </button>
              </div>
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
                  <span className="text-gray-600">Discount</span>
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
              
              {/* ... (rest of the order summary remains the same) ... */}
            </div>
          </div>
        </div>
      </div>
      
      {/* ... (footer remains the same) ... */}
    </div>
  );
};

export default CartPage;