import BrowseMenuNavBar from '../components/BrowseMenu'
import { motion } from 'framer-motion'

const categories = [
  { name: 'Burgers', icon: '/Assets/burger.png' },
  { name: 'Pizza', icon: '/Assets/pizza.png' },
  { name: 'Drinks', icon: '/Assets/drink.png' },
  { name: 'Desserts', icon: '/Assets/dessert.png' },
  { name: 'Salads', icon: '/Assets/salad.png' },
  { name: 'Seafood', icon: '/Assets/seafood.png' },
]

const menuItems = Array.from({ length: 8 }).map((_, i) => ({
  name: `Delicious Dish ${i + 1}`,
  desc: 'A tasty treat with fresh ingredients and great flavor.',
  price: `LKR ${(400 + i * 50).toFixed(2)}`,
  img: `/Assets/product_Grid${(i % 4) + 1}.jpg`,
}))

const BrowseMenu = () => {
  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <BrowseMenuNavBar />

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-amber-100 to-amber-300 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4">Browse Our Menu</h1>
        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mb-8">Discover a variety of delicious meals, snacks, and drinks from our extensive menu. Filter by category or search for your favorites!</p>
        <div className="flex flex-wrap gap-6 justify-center">
          {categories.map(cat => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.08 }}
              className="flex flex-col items-center bg-white shadow-md rounded-xl px-6 py-4 hover:bg-amber-100 transition"
            >
              <img src={cat.icon} alt={cat.name} className="w-12 h-12 mb-2" />
              <span className="text-base font-semibold text-slate-900">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-lg border border-black/10 p-8 flex flex-row gap-8 min-w-[350px] max-w-2xl mx-auto hover:shadow-amber-200 transition-shadow"
            whileHover={{ y: -5 }}
          >
            {/* Left: Product Image */}
            <div className="flex-shrink-0 w-40 h-40 flex items-center justify-center">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            {/* Right: Product Details */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-black text-2xl font-semibold">{item.name}</h3>
                <p className="text-black text-base mt-2">{item.desc}</p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className="text-slate-950 text-xl font-bold">{item.price}</span>
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
  )
}

export default BrowseMenu