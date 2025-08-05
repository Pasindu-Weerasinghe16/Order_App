import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FlashSaleNavBar from '../components/FlashSaleNavBar'


const FlashSalePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
  })

  const flashDeals = [
    {
      id: 1,
      name: "Organic Strawberries",
      originalPrice: "$6.99",
      discountPrice: "$4.99",
      discount: "30% OFF",
      image: "/strawberries.jpg",
      timeLeft: "01:15:00"
    },
    {
      id: 2,
      name: "Grass-Fed Beef",
      originalPrice: "$12.99",
      discountPrice: "$8.99",
      discount: "30% OFF",
      image: "/beef.jpg",
      timeLeft: "00:45:00"
    },
    {
      id: 3,
      name: "Artisan Bread",
      originalPrice: "$7.99",
      discountPrice: "$5.99",
      discount: "25% OFF",
      image: "/bread.jpg",
      timeLeft: "02:00:00"
    },
    {
      id: 4,
      name: "Avocados",
      originalPrice: "$2.49",
      discountPrice: "$1.49",
      discount: "40% OFF",
      image: "/avocados.jpg",
      timeLeft: "00:30:00"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = {...prev}
        if (newTime.seconds > 0) {
          newTime.seconds--
        } else {
          if (newTime.minutes > 0) {
            newTime.minutes--
            newTime.seconds = 59
          } else {
            if (newTime.hours > 0) {
              newTime.hours--
              newTime.minutes = 59
              newTime.seconds = 59
            } else {
              clearInterval(timer)
            }
          }
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NavBar Container */}
      <div className="relative h-[200px]">
        <FlashSaleNavBar />
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-4 pb-20">
        {/* Flash Sale Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-red-600 mb-2"
          >
            FLASH SALE
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-red-100 border border-red-300 rounded-full inline-flex items-center px-6 py-2 mb-6"
          >
            <span className="text-red-700 font-bold mr-2">ENDS IN:</span>
            <span className="text-red-700 font-mono text-xl">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </motion.div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited time offers! These deals won't last long - shop now before they're gone!
          </p>
        </div>

        {/* Flash Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-red-300 relative"
            >
              {/* Hot Deal Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                HOT DEAL!
              </div>
              
              {/* Product Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{deal.name}</h3>
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-bold">
                    {deal.discount}
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-red-600 font-bold text-xl mr-2">{deal.discountPrice}</span>
                  <span className="text-gray-400 line-through text-sm">{deal.originalPrice}</span>
                </div>
                
                {/* Countdown Timer */}
                <div className="bg-red-50 rounded-lg p-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-700">Time left:</span>
                    <span className="font-mono text-red-700 font-bold">{deal.timeLeft}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${Math.random() * 30 + 30}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition-colors">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Sale Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-6 text-white"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">More Amazing Deals!</h2>
              <p className="text-xl mb-4">Check out these limited-time offers before they expire</p>
              <button className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                View All Deals
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-amber-500 text-5xl">🔥</span>
                
              </div>
            </div>
          
          </div>
        </motion.div>
       
      </div>
      {/* Footer */}
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

export default FlashSalePage