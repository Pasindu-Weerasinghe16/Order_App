import { useState, useEffect } from 'react';
import { getProducts, createOrder, getMyOrders } from '../api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* --- Local storage helpers (same key as ProductPage) --- */
const CART_KEY = 'supermart_cart_v1';
const getCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart_updated', { detail: cart }));
  } catch (e) {
    console.error('Failed to save cart', e);
  }
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); // still fetch to keep parity & images if needed
  const [orders, setOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [receipt, setReceipt] = useState(null); // receipt object shown after checkout
  const [processing, setProcessing] = useState(false);

  // NEW: selected order for "view" modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // load cart from storage
    setCart(getCartFromStorage());

    // fetch products & orders (existing backend logic preserved)
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

    // listen for cart updates from ProductPage
    const onCartUpdated = (e) => {
      const newCart = e?.detail ?? getCartFromStorage();
      setCart(newCart);
    };
    window.addEventListener('cart_updated', onCartUpdated);

    // also handle storage events across tabs
    const onStorage = (ev) => {
      if (ev.key === CART_KEY) {
        setCart(getCartFromStorage());
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('cart_updated', onCartUpdated);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // local helpers to update cart + storage
  const updateCart = (newCart) => {
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const handleAddToCartLocal = (product) => {
    // useful if you want to add from cart page UI; ProductPage already uses localStorage
    const c = getCartFromStorage();
    const idx = c.findIndex(item => item.product._id === product._id);
    if (idx !== -1) {
      c[idx].quantity += 1;
    } else {
      c.push({ product, quantity: 1 });
    }
    updateCart(c);
    setAlertMessage(`${product.name} added to cart`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1600);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    const newCart = cart.map(item => item.product._id === productId ? { ...item, quantity: newQty } : item);
    updateCart(newCart);
  };

  const handleRemoveFromCart = (productId) => {
    const newCart = cart.filter(item => item.product._id !== productId);
    updateCart(newCart);
  };

  // Checkout: show receipt modal & process order, then show final receipt
  const handleCheckout = async () => {
    if (cart.length === 0) {
      setAlertMessage('Cart is empty');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1600);
      return;
    }

    // Prepare receipt preview (local)
    const items = cart.map(item => ({
      name: item.product.name,
      price: item.product.price,
      qty: item.quantity,
      subtotal: item.product.price * item.quantity,
      image: item.product.image,
    }));
    const subtotal = items.reduce((s, it) => s + it.subtotal, 0);
    const deliveryFee = cart.length > 0 ? 250 : 0;
    const discount = subtotal * 0.02;
    const total = subtotal + deliveryFee - discount;

    // show quick in-progress modal
    setReceipt({
      status: 'processing',
      items,
      subtotal,
      deliveryFee,
      discount,
      total,
      createdAt: new Date().toISOString(),
      orderId: null,
    });

    setProcessing(true);

    // Call backend createOrder (kept identical)
    try {
      const payloadItems = cart.map(item => ({ product: item.product._id, quantity: item.quantity, price: item.product.price }));
      const totalPrice = payloadItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const res = await createOrder({ items: payloadItems, totalPrice });
      // If backend returns order data, use it; otherwise create a synthetic order id
      const orderId = res?.data?._id || (res?.data?.id) || `LOCAL-${Date.now().toString().slice(-6)}`;

      // update receipt
      setReceipt(prev => ({ ...prev, status: 'success', orderId, createdAt: new Date().toISOString() }));
      setAlertMessage('Order placed successfully!');
      setShowAlert(true);
      // clear cart
      updateCart([]);
      // refresh orders from backend (kept)
      const orderRes = await getMyOrders();
      setOrders(orderRes.data || []);
    } catch (err) {
      console.error(err);
      setReceipt(prev => ({ ...prev, status: 'failed' }));
      setAlertMessage('Failed to place order.');
      setShowAlert(true);
    } finally {
      setProcessing(false);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 250 : 0;
  const discount = subtotal * 0.02;
  const total = subtotal + deliveryFee - discount;

  const fmt = (n) => `LKR ${Number(n || 0).toFixed(2)}`;

  // ---------- Recent Orders helpers (NEW) ----------
  // show last 10 orders (most recent first)
  const last10Orders = [...(orders || [])].reverse().slice(0, 10);

  const statusMeta = (status) => {
    const s = (status || '').toString().toLowerCase();
    if (s.includes('process') || s === 'processing') return { label: 'Processing', color: 'bg-amber-100 text-amber-800' };
    if (s.includes('fail') || s === 'failed' || s === 'error') return { label: 'Failed', color: 'bg-red-100 text-red-700' };
    return { label: 'Placed', color: 'bg-emerald-100 text-emerald-800' };
  };

  const renderOrderThumbnails = (order) => {
    if (!order.items || order.items.length === 0) return null;
    const thumbs = order.items.slice(0, 3).map((it, idx) => {
      const p = it.product || {};
      const src = p.image ? (p.image.startsWith('http') ? p.image : `http://localhost:5000${p.image}`) : null;
      return (
        <div key={idx} className="w-10 h-10 rounded-md overflow-hidden border border-gray-100">
          {src ? <img src={src} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100" />}
        </div>
      );
    });
    const extra = order.items.length > 3 ? order.items.length - 3 : 0;
    return (
      <div className="flex items-center -space-x-2">
        {thumbs}
        {extra > 0 && (
          <div className="w-10 h-10 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
            +{extra}
          </div>
        )}
      </div>
    );
  };

  const shortId = (id) => (id ? `#${String(id).slice(-6)}` : '');

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      {showAlert && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-orange-50 border-l-4 border-orange-400 text-orange-800 p-4 rounded-lg shadow-lg max-w-md"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="font-semibold">{alertMessage}</div>
            <button className="ml-auto text-orange-700" onClick={() => setShowAlert(false)}>✕</button>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-8 mt-28">
        <motion.h1 className="text-4xl font-bold text-orange-900 mb-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          Shopping Cart
        </motion.h1>
        <p className="text-gray-600 mb-8">Products are added from the Products page. This cart shows images and a receipt modal when you checkout.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart items (big column) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Add More Products Button (only if cart has items) */}
            {cart.length > 0 && (
              <div className="flex justify-end mb-2">
                <Link
                  to="/product"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                >
                  Add More Products
                </Link>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Your Cart</h2>
                <div className="text-sm text-gray-500">{cart.length} item(s)</div>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="mb-4">Your cart is empty.</div>
                  <Link
                    to="/product"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                  >
                    Go to Products Page
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.product._id} className="flex items-center gap-4 bg-gradient-to-r from-white to-amber-50 rounded-xl p-3 border border-amber-100">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-orange-50 border border-orange-100 flex items-center justify-center">
                        {item.product.image ? (
                          <img src={item.product.image.startsWith('http') ? item.product.image : `http://localhost:5000${item.product.image}`} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-10 h-10 text-orange-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 3.5a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0">
                            <div className="font-medium text-orange-900 truncate">{item.product.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{item.product.category || 'General'}</div>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold">{fmt(item.product.price * item.quantity)}</div>
                            <div className="text-xs text-gray-500">{fmt(item.product.price)} each</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)} className="px-3 py-1 bg-white/60">-</button>
                            <div className="px-4 py-1">{item.quantity}</div>
                            <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)} className="px-3 py-1 bg-white/60">+</button>
                          </div>

                          <button onClick={() => handleRemoveFromCart(item.product._id)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* -------------------------
                REPLACED: Recent Orders (creative timeline)
                This block replaces the previous simple list and sits exactly here.
                Shows last 10 orders (most recent first).
               ------------------------- */}
            <div className="bg-white rounded-2xl border p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold">Recent Orders</div>
                <div className="text-sm text-gray-500">{orders.length}</div>
              </div>

              {last10Orders.length === 0 ? (
                <div className="text-gray-500 text-sm">No orders yet.</div>
              ) : (
                <div className="space-y-4 relative pl-6">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
                  {last10Orders.map((order, idx) => {
                    const meta = statusMeta(order.status);
                    return (
                      <motion.div key={order._id || idx} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }} className="relative mb-6">
                        <div className="absolute left-0 top-2">
                          <div className="w-5 h-5 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center text-xs font-bold text-amber-600 shadow-sm">
                            {idx + 1}
                          </div>
                        </div>

                        <div className="ml-8 bg-gradient-to-r from-white to-amber-50 border border-amber-100 p-4 rounded-xl shadow-sm flex justify-between items-start gap-4">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="flex-shrink-0">
                              {renderOrderThumbnails(order)}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-gray-800 truncate">{shortId(order._id)} • {order.items?.length || 0} item(s)</div>
                                <div className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${meta.color}`}>{meta.label}</div>
                              </div>
                              <div className="text-sm text-gray-500 mt-1 truncate">{new Date(order.createdAt).toLocaleString()}</div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <div className="font-bold text-gray-900">{fmt(order.totalPrice)}</div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setSelectedOrder(order)} className="text-sm px-3 py-1 rounded-lg bg-amber-500 text-white">View</button>
                              <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(order)); setAlertMessage('Order copied to clipboard'); setShowAlert(true); setTimeout(() => setShowAlert(false), 1600); }} className="text-sm px-3 py-1 rounded-lg border">Copy</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary & Checkout (unchanged) */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-amber-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Cart Summary</h3>
                <div className="text-sm text-gray-500">{cart.length} item(s)</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span className="font-medium">{fmt(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Delivery</span><span className="font-medium">{fmt(deliveryFee)}</span></div>
                <div className="flex justify-between text-sm text-emerald-600"><span>Discount (2%)</span><span>-{fmt(discount)}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>{fmt(total)}</span></div>

                <button onClick={handleCheckout} disabled={processing} className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3 font-semibold disabled:opacity-60">
                  {processing ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">When you checkout you'll see an order receipt preview and status.</div>
          </div>
        </div>
      </div>

      {/* Receipt Modal (checkout result) */}
      {receipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg font-bold">Order Receipt</div>
                <div className="text-sm text-gray-500">Status: {receipt.status === 'processing' ? 'Order in progress...' : receipt.status === 'success' ? 'Placed' : 'Failed'}</div>
              </div>
              <div className="text-right text-sm">
                <div>{receipt.orderId ? `Order #${receipt.orderId}` : ''}</div>
                <div className="text-gray-500">{new Date(receipt.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="divide-y">
              <div className="pb-4 space-y-3">
                {receipt.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-orange-50 border border-orange-100">
                      {it.image ? (
                        <img src={it.image.startsWith('http') ? it.image : `http://localhost:5000${it.image}`} alt={it.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-orange-200">—</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{it.name}</div>
                      <div className="text-sm text-gray-500">Qty: {it.qty} • {fmt(it.price)} each</div>
                    </div>
                    <div className="text-right font-semibold">{fmt(it.subtotal)}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>{fmt(receipt.subtotal)}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Delivery</span><span>{fmt(receipt.deliveryFee)}</span></div>
                <div className="flex justify-between text-sm text-emerald-600"><span>Discount</span><span>-{fmt(receipt.discount)}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>{fmt(receipt.total)}</span></div>

                <div className="mt-4 flex gap-3 justify-end">
                  {receipt.status === 'success' && (
                    <button onClick={() => { setReceipt(null); }} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Close</button>
                  )}
                  {receipt.status === 'processing' && (
                    <button onClick={() => { setReceipt(null); }} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Close</button>
                  )}
                  {receipt.status === 'failed' && (
                    <button onClick={() => setReceipt(null)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Close</button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Order Detail Modal (when user clicks "View" on a recent order) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[85vh] overflow-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold">Order {shortId(selectedOrder._id)}</div>
                <div className="text-sm text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString()}</div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500">Close ✕</button>
            </div>

            <div className="mt-4 divide-y">
              <div className="py-4">
                {(selectedOrder.items || []).map((it, i) => {
                  const p = it.product || {};
                  return (
                    <div key={i} className="flex items-center justify-between gap-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {p.image && (
                          <div className="w-14 h-14 rounded-md overflow-hidden">
                            <img src={p.image.startsWith('http') ? p.image : `http://localhost:5000${p.image}`} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-medium truncate">{p.name}</div>
                          <div className="text-sm text-gray-500">{p.category || 'General'}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">{fmt((p.price || it.price || 0) * (it.quantity || 1))}</div>
                        <div className="text-sm text-gray-500">{it.quantity} × {fmt(p.price || it.price || 0)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="py-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1"><span>Subtotal</span><span>{fmt(selectedOrder.items.reduce((s,it)=>(s + ((it.product?.price || it.price || 0) * (it.quantity || 0))),0))}</span></div>
                <div className="flex justify-between text-sm text-gray-600 mb-1"><span>Delivery</span><span>{fmt(selectedOrder.delivery || 250)}</span></div>
                <div className="flex justify-between text-sm text-emerald-600 mb-1"><span>Discount</span><span>-{fmt((selectedOrder.items.reduce((s,it)=>(s + ((it.product?.price || it.price || 0) * (it.quantity || 0))),0)) * 0.02)}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>{fmt(selectedOrder.totalPrice)}</span></div>
              </div>

              <div className="py-4 flex justify-end gap-3">
                <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(selectedOrder)); setAlertMessage('Order copied'); setShowAlert(true); setTimeout(()=>setShowAlert(false),1500); }} className="px-4 py-2 border rounded-lg">Copy JSON</button>
                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-amber-500 text-white rounded-lg">Close</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
