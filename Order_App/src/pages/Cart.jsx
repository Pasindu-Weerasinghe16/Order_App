import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavBarCart from '../components/NavBarCart'

const CartPage = () => {
  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      <NavBarCart />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-60 flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="w-full lg:w-72 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-black text-xl font-semibold mb-6">Filters</h3>
          
          {/* Price Filter */}
          <div className="mb-8">
            <h4 className="text-gray-800 text-lg font-semibold mb-4">Price</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-800/50" />
                <span className="text-slate-800">Discounted</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-800/50" />
                <span className="text-slate-800">Regular Price</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-neutral-500/30 my-6"></div>

          {/* Category Filter */}
          <div>
            <h4 className="text-gray-800 text-lg font-semibold mb-4">Category</h4>
            <div className="space-y-3">
              {['Fruits & Vegetables', 'Snacks & Beverages', 'Meat & Seafood', 
                'Canned & Packaged Goods', 'Bakery Items', 'Other'].map((category) => (
                <div key={category} className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-800/50" />
                  <span className="text-slate-800">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid - Two cards per row on large screens */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg border border-black/10 p-8 flex flex-row gap-8 min-w-[400px] max-w-2xl mx-auto"
              whileHover={{ y: -5 }}
            >
              {/* Left: Product Image */}
              <div className="flex-shrink-0 w-52 h-52 flex items-center justify-center">
                <img 
                  src={`/Assets/product_Grid${index + 1}.jpg`} 
                  alt="Product" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Right: Product Details */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-black text-2xl font-semibold">Royal Cheese Burger with extra Fries</h3>
                  <p className="text-black text-base mt-2">1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium</p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-slate-950 text-xl font-bold">LKR 560.4</span>
                  <button className="bg-green-700 text-white p-3 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m2.35 9.708c-.155.516.232 1.02.772 1.02h12.508a.75.75 0 0 0 .743-.648l1.2-8.4a.75.75 0 0 0-.743-.852H6.28m0 0L5.1 4.272A1.125 1.125 0 0 0 4.013 3.75H2.25m3.75 6.75h13.5m-10.5 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7.5 1.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-amber-500 rounded-xl py-8 my-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "546+", label: "Registered Riders" },
            { value: "789,900+", label: "Orders Delivered" },
            { value: "690+", label: "Restaurants Partnered" },
            { value: "17,457+", label: "Food items" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-white text-4xl md:text-5xl font-light">{stat.value}</h3>
              <p className="text-white text-xl font-bold mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-zinc-300 py-12">
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
                <input 
                  type="email" 
                  placeholder="youremail@gmail.com" 
                  className="flex-1 bg-zinc-300 rounded-l-full px-6 py-3 border border-black/40"
                />
                <button className="bg-amber-500 text-white px-6 py-3 rounded-r-full font-medium">
                  Subscribe
                </button>
              </div>
              <p className="text-slate-950 text-xs mt-2">
                we won't spam, read our <span className="underline">email policy</span>
              </p>
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
    </div>
  )
}

export default CartPage