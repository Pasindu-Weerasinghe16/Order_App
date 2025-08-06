import { Link, useLocation } from 'react-router-dom'
import { FaMapMarkerAlt, FaShoppingCart, FaChevronDown, FaUser, FaBell } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ContactUsNavBar = () => {
  const location = useLocation()
  
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="w-[1528px] h-16 left-[196px] top-[26px] absolute bg-neutral-50 rounded-bl-xl rounded-br-xl border border-black/10" />
      
      {/* Location Section */}
      <motion.div 
        className="left-[862px] top-[49px] absolute justify-start"
        whileHover={{ scale: 1.02 }}
      >
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
      
      {/* Cart Section */}
      <div className="w-96 h-16 left-[1357px] top-[26px] absolute bg-green-700 rounded-bl-xl rounded-br-xl border border-black/10" />
      <FaShoppingCart className="w-6 h-6 left-[1381px] top-[41px] absolute text-white" />
      
      <div className="w-16 h-0 left-[1434px] top-[26px] absolute origin-top-left rotate-90 opacity-30 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
      <div className="w-16 h-0 left-[1546px] top-[26px] absolute origin-top-left rotate-90 opacity-30 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
      <div className="w-16 h-0 left-[1662px] top-[26px] absolute origin-top-left rotate-90 opacity-30 outline outline-1 outline-offset-[-0.50px] outline-white"></div>
      
      <div className="left-[1564px] top-[49px] absolute justify-start text-white text-base font-semibold font-['Poppins']">LKR 90.5</div>
      <div className="left-[1455px] top-[49px] absolute justify-start text-white text-base font-semibold font-['Poppins']">23 Items</div>
      
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
      
      {/* Navigation Links */}
      <div className="left-[547px] top-[135px] absolute justify-start flex items-center gap-7">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/">
            <button className={`px-4 py-2 rounded-full text-lg font-medium font-['Poppins'] shadow transition-colors ${
              location.pathname === '/' ? 'bg-amber-500 text-white' : 'bg-neutral-200 text-black hover:bg-amber-100'
            }`}>Home</button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/flash-sale">
            <button className={`px-4 py-2 rounded-full text-lg font-medium font-['Poppins'] shadow transition-colors ${
              location.pathname === '/browse-menu' ? 'bg-amber-500 text-white' : 'bg-neutral-200 text-black hover:bg-amber-100'
            }`}>Flash Sale</button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/product">
            <button className={`px-4 py-2 rounded-full text-lg font-medium font-['Poppins'] shadow transition-colors ${
              location.pathname === '/cart' ? 'bg-amber-500 text-white' : 'bg-neutral-200 text-black hover:bg-amber-100'
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
      
      {/* Login and Signup Buttons */}
      <div className="flex items-center gap-3 absolute left-[1422px] top-[118px]">
        <motion.button
          className="px-6 py-2 rounded-full bg-slate-950 text-white text-lg font-medium font-['Poppins'] hover:bg-amber-500 transition-colors duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUser className="w-5 h-5" /> Login
        </motion.button>
        <motion.button
          className="px-6 py-2 rounded-full bg-amber-500 text-white text-lg font-medium font-['Poppins'] hover:bg-slate-950 transition-colors duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Signup
        </motion.button>
      </div>
      
      {/* Notification and Profile */}
      <div className="w-28 h-12 left-[1684px] top-[129px] absolute inline-flex justify-start items-center gap-7">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaBell className="w-6 h-6 text-gray-800" />
          <motion.div 
            className="w-2 h-2 absolute -top-0 -right-0 bg-red-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold"
          whileHover={{ scale: 1.1 }}
        >
          User
        </motion.div>
      </div>
    </>
  )
}

export default ContactUsNavBar