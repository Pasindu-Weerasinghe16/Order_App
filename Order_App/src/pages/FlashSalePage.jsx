// pages/FlashSalePage.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FlashSaleNavBar from '../components/FlashSaleNavBar';


const CART_KEY = 'supermart_cart_v1';
const readCartFromStorage = () => {
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
    console.error('saveCartToStorage', e);
  }
};

const FlashSalePage = () => {
  // Global flash header timer (2:30:00 default)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 });
  const [toast, setToast] = useState(null);

  // creative sample deals (images - replace with your assets)
  const [flashDeals] = useState([
    {
      id: 'f1',
      name: 'Organic Strawberries',
      price: 499.0,            // LKR
      original: 699.0,
      discountLabel: '30% OFF',
      image: '/Assets/Flash_sale_01.jpg', // match the actual filename and folder case
      stock: 12,
    },
    {
      id: 'f2',
      name: 'Grass-Fed Beef',
      price: 899.0,
      original: 1299.0,
      discountLabel: '30% OFF',
      image: '/Assets/Flash_sale_02.webp',
      stock: 6,
    },
    {
      id: 'f3',
      name: 'Artisan Bread',
      price: 599.0,
      original: 799.0,
      discountLabel: '25% OFF',
      image: '/Assets/Flash_sale_03.jpg',
      stock: 18,
    },
    {
      id: 'f4',
      name: 'Avocados (2 pcs)',
      price: 149.0,
      original: 249.0,
      discountLabel: '40% OFF',
      image: '/Assets/Flash_sale_04.jpg',
      stock: 4,
    },
    {
      id: 'f5',
      name: 'Fresh Salmon Fillet',
      price: 1299.0,
      original: 1699.0,
      discountLabel: '24% OFF',
      image: '/Assets/Flash_sale_05.jpg',
      stock: 8,
    },
    {
      id: 'f6',
      name: 'Cold Brew Coffee',
      price: 349.0,
      original: 499.0,
      discountLabel: '30% OFF',
      image: '/Assets/Flash_sale_06.webp',
      stock: 25,
    },
    {
      id: 'f7',
      name: 'Greek Yogurt 500g',
      price: 299.0,
      original: 399.0,
      discountLabel: '25% OFF',
      image: '/Assets/Flash_sale_07.webp',
      stock: 15,
    },
    {
      id: 'f8',
      name: 'Organic Eggs (12)',
      price: 599.0,
      original: 799.0,
      discountLabel: '25% OFF',
      image: '/Assets/Flash_sale_08.webp',
      stock: 20,
    }
  ]);

  // header countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds;
        if (total <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        total -= 1;
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fmtClock = (t) => `${String(t.hours).padStart(2, '0')}:${String(t.minutes).padStart(2, '0')}:${String(t.seconds).padStart(2, '0')}`;
  const fmtPrice = (n) => `LKR ${Number(n || 0).toFixed(2)}`;

  // Add to cart logic using same storage key
  const addToCart = (deal) => {
    try {
      const cart = readCartFromStorage();
      const idx = cart.findIndex((it) => it.product._id === deal.id);
      if (idx !== -1) {
        cart[idx].quantity += 1;
      } else {
        // keep product shape compatible with other pages
        cart.push({
          product: {
            _id: deal.id,
            name: deal.name,
            price: deal.price,
            image: deal.image,
            category: 'Flash Sale',
          },
          quantity: 1,
        });
      }
      saveCartToStorage(cart);
      setToast(`${deal.name} added to cart`);
      setTimeout(() => setToast(null), 1800);
    } catch (e) {
      console.error(e);
      setToast('Failed to add to cart');
      setTimeout(() => setToast(null), 1800);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      {/* NavBar (keeps same absolute positions) */}
      <div className="relative h-[200px]">
        <FlashSaleNavBar />
      </div>

      {/* Header / Hero */}
      <div className="container mx-auto px-4 pt-6 pb-8">
        <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 p-6 md:p-10 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl font-extrabold text-red-600">
                FLASH SALE — HOT OFFERS
              </motion.h1>
              <p className="text-gray-700 mt-2 max-w-xl">
                Hand-picked fresh items at unbeatable prices. Limited stock — grab them before they're gone!
              </p>

              <div className="mt-4 inline-flex items-center space-x-4">
                <div className="bg-red-100 border border-red-300 px-4 py-2 rounded-full inline-flex items-center gap-3">
                  <span className="text-red-700 font-bold">ENDS IN</span>
                  <span className="font-mono text-lg text-red-700">{fmtClock(timeLeft)}</span>
                </div>

                <button onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold transition-colors">
                  Shop Deals
                </button>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                <div className="text-sm text-gray-500">Hot picks today</div>
                <div className="text-2xl font-bold text-red-600">8</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                <div className="text-sm text-gray-500">Avg Discount</div>
                <div className="text-2xl font-bold text-amber-600">30%</div>
              </div>
            </div>
          </div>

          {/* floating flame */}
          <div className="absolute right-6 top-6 opacity-30 text-6xl select-none">🔥</div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((deal, idx) => {
            // random progress width for progress bar visual
            const progress = Math.min(95, Math.max(20, Math.round((deal.stock / 30) * 100)));
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ translateY: -6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-300 relative"
              >
                {/* HOT badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">HOT DEAL</div>

                {/* Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{deal.name}</h3>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-bold">{deal.discountLabel}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-red-600 font-extrabold text-xl">{fmtPrice(deal.price)}</div>
                    <div className="text-gray-400 line-through text-sm">{fmtPrice(deal.original)}</div>
                  </div>

                  {/* stock progress */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1 text-sm text-gray-500">
                      <span>Stock left</span>
                      <span>{deal.stock} pcs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Countdown micro (static for each card to keep simple) */}
                  <div className="bg-red-50 rounded-lg p-2 mb-3 text-sm flex items-center justify-between">
                    <div className="text-red-700 font-medium">Deal ends</div>
                    <div className="font-mono text-red-700">00: {String(30 - (idx * 5)).padStart(2, '0')}:00</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(deal)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition-colors"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => setToast(`${deal.name} wishlisted (demo)`)}
                      className="px-3 py-2 border rounded-lg text-gray-700"
                    >
                      ♥
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Promo band */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">More Amazing Deals — Limited Time</h2>
              <p className="mt-1">Subscribe for early access and extra coupons.</p>
            </div>
            <div className="flex items-center gap-3">
              <input type="email" placeholder="youremail@gmail.com" className="px-4 py-2 rounded-l-full text-gray-800" />
              <button className="bg-white text-amber-600 px-5 py-2 rounded-r-full font-bold">Subscribe</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer (kept simple) */}
      <div className="bg-zinc-300 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="/assets/logo_footer.png" alt="Logo" className="h-12 mb-4" />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`/assets/social_${i}.png`} alt="Social" className="w-10 h-10" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-950 text-lg font-bold mb-4">Get Exclusive Deals in your Inbox</h4>
              <div className="flex">
                <input type="email" placeholder="youremail@gmail.com" className="flex-1 bg-zinc-300 rounded-l-full px-6 py-3 border border-black/40" />
                <button className="bg-amber-500 text-white px-6 py-3 rounded-r-full font-medium">Subscribe</button>
              </div>
              <p className="text-slate-950 text-xs mt-2">we won't spam, read our <span className="underline">email policy</span></p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-950 text-lg font-bold mb-4">Important Links</h4>
                <ul className="space-y-2 text-black underline">
                  <li>Get help</li>
                  <li>Add your restaurant</li>
                  <li>Sign up to deliver</li>
                  <li>Create a business account</li>
                </ul>
              </div>
              <div>
                <h4 className="text-slate-950 text-lg font-bold mb-4">Legal Pages</h4>
                <ul className="space-y-2 text-black underline">
                  <li>Terms and conditions</li>
                  <li>Privacy</li>
                  <li>Cookies</li>
                  <li>Modern Slavery Statement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white">Order.uk Copyright 2024, All Rights Reserved.</p>
          <div className="flex gap-8 text-white">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Pricing</span>
            <span>Do not sell or share my personal information</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 z-50 bg-orange-50 border-l-4 border-orange-400 text-orange-800 p-3 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  );
};

export default FlashSalePage;
