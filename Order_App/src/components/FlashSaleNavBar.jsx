// components/FlashSaleNavBar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaShoppingCart, FaChevronDown, FaUser, FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CART_KEY = 'supermart_cart_v1';

const readCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('readCartFromStorage error', e);
    return [];
  }
};

const FlashSaleNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => readCartFromStorage());
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calc = (c) => {
      const count = (c || []).reduce((s, it) => s + (it.quantity || 0), 0);
      const total = (c || []).reduce((s, it) => s + ((it.product?.price || 0) * (it.quantity || 0)), 0);
      setItemCount(count);
      setTotalPrice(total);
    };
    calc(cart);

    const onCartUpdated = (e) => {
      const newCart = e?.detail ?? readCartFromStorage();
      setCart(newCart);
      calc(newCart);
    };
    window.addEventListener('cart_updated', onCartUpdated);

    const onStorage = (ev) => {
      if (ev.key === CART_KEY) {
        const newCart = readCartFromStorage();
        setCart(newCart);
        calc(newCart);
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('cart_updated', onCartUpdated);
      window.removeEventListener('storage', onStorage);
    };
  }, [cart]);

  const fmt = (n) => `LKR ${Number(n || 0).toFixed(2)}`;
  const goToCart = () => navigate('/cart-page');

  return (
    <>
      {/* Top Navigation Bar background (positions preserved) */}
      <div className="w-[1528px] h-16 left-[196px] top-[26px] absolute bg-neutral-50 rounded-bl-xl rounded-br-xl border border-black/10" />

      {/* Location Section */}
      <motion.div className="left-[862px] top-[49px] absolute justify-start" whileHover={{ scale: 1.02 }}>
        <span className="text-slate-950 text-base font-medium font-['Poppins']">Regent Street, </span>
        <span className="text-slate-950 text-base font-medium font-['Poppins'] underline">A4</span>
        <span className="text-slate-950 text-base font-medium font-['Poppins']">, A4201, London</span>
      </motion.div>

      <motion.div
        className="left-[1120px] top-[51px] absolute justify-start text-amber-500 text-sm font-medium font-['Poppins'] underline"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Change Location
      </motion.div>

      <FaMapMarkerAlt className="w-6 h-6 left-[823px] top-[48px] absolute text-gray-700" />

      {/* Cart Section (preserved position & shape) */}
      <div
        role="button"
        onClick={goToCart}
        className="w-96 h-16 left-[1357px] top-[26px] absolute bg-amber-600 rounded-bl-xl rounded-br-xl border border-black/10 cursor-pointer"
        title="Open cart"
      />

      {/* Cart Icon (clickable) */}
      <button
        onClick={goToCart}
        aria-label="Open cart"
        className="absolute left-[1381px] top-[31px] bg-transparent p-0 border-0"
        style={{ width: 32, height: 32 }}
      >
        <FaShoppingCart className="w-8 h-8 left-[1381px] top-[41px] absolute text-white" />
      </button>

      {/* Decorative vertical dividers (kept) */}
      <div className="w-16 h-0 left-[1434px] top-[26px] absolute origin-top-left rotate-90 opacity-30 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
      <div className="w-16 h-0 left-[1546px] top-[26px] absolute origin-top-left rotate-90 opacity-30 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
      <div className="w-16 h-0 left-[1662px] top-[26px] absolute origin-top-left rotate-90 opacity-30 outline outline-1 outline-offset-[-0.50px] outline-white"></div>

      {/* Item count & total (kept positions) */}
      <div onClick={goToCart} className="left-[1455px] top-[49px] absolute justify-start text-white text-base font-semibold font-['Poppins'] cursor-pointer">
        {itemCount} Items
      </div>

      <div onClick={goToCart} className="left-[1564px] top-[49px] absolute justify-start text-white text-base font-semibold font-['Poppins'] cursor-pointer">
        {fmt(totalPrice)}
      </div>

      <FaChevronDown className="w-5 h-5 left-[1710px] top-[43px] absolute text-white transform -rotate-90" />

      {/* Logo */}
      <motion.div
        className="w-44 h-14 left-[128px] top-[122px] absolute bg-gray-800 text-white flex items-center justify-center text-xl font-bold rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Order
      </motion.div>

      {/* Navigation Links (positions preserved) */}
      <div className="left-[547px] top-[135px] absolute justify-start flex items-center gap-7">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/home">
            <button className={`px-4 py-2 rounded-full text-lg font-medium font-['Poppins'] shadow transition-colors ${
              location.pathname === '/' ? 'bg-amber-500 text-white' : 'bg-neutral-200 text-black hover:bg-amber-100'
            }`}>Home</button>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/flash-sale">
            <button className={`px-4 py-2 rounded-full text-lg font-medium font-['Poppins'] shadow transition-colors ${
              location.pathname === '/flash-sale' ? 'bg-amber-500 text-white' : 'bg-neutral-200 text-black hover:bg-amber-100'
            }`}>Flash Sale</button>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/product">
            <button className={`px-4 py-2 rounded-full text-lg font-medium font-['Poppins'] shadow transition-colors ${
              location.pathname === '/product' ? 'bg-amber-500 text-white' : 'bg-neutral-200 text-black hover:bg-amber-100'
            }`}>Product</button>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/contact-us">
            <button className={`px-4 py-2 rounded-full text-lg font-medium font-['Poppins'] shadow transition-colors ${
              location.pathname === '/contact-us' ? 'bg-amber-500 text-white' : 'bg-neutral-200 text-black hover:bg-amber-100'
            }`}>Connect Us</button>
          </Link>
        </motion.div>
      </div>

      {/* Login / Signup (positions preserved) */}
      <div className="flex items-center gap-3 absolute left-[1422px] top-[118px]">
        <motion.button
          className="px-6 py-2 rounded-full bg-slate-950 text-white text-lg font-medium font-['Poppins'] hover:bg-amber-500 transition-colors duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
        >
          <FaUser className="w-5 h-5" /> Login
        </motion.button>

        <motion.button
          className="px-6 py-2 rounded-full bg-amber-500 text-white text-lg font-medium font-['Poppins'] hover:bg-slate-950 transition-colors duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/signup')}
        >
          Signup
        </motion.button>
      </div>

      {/* Notification & profile (kept) */}
      <div className="w-28 h-12 left-[1684px] top-[129px] absolute inline-flex justify-start items-center gap-7">
        <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FaBell className="w-6 h-6 text-gray-800" />
          <motion.div
            className="w-2 h-2 absolute -top-0 -right-0 bg-red-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>

        <motion.div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold" whileHover={{ scale: 1.1 }}>
          User
        </motion.div>
      </div>
    </>
  );
};

export default FlashSaleNavBar;
