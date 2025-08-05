import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiEdit2, FiTrash2, FiPlus, FiPackage, FiDollarSign, FiTag, FiInfo } from 'react-icons/fi'

const initialProduct = {
  name: '',
  description: '',
  price: '',
  category: '',
  image: '',
  stock: '',
  unit: 'kg'
}

const categories = [
  'Fruits & Vegetables',
  'Snacks & Beverages',
  'Meat & Seafood',
  'Canned & Packaged Goods',
  'Bakery Items',
  'Dairy Products',
  'Organic Foods',
  'Frozen Foods'
]

const units = ['kg', 'g', 'lb', 'oz', 'piece', 'pack', 'liter', 'ml']

const SupplierDashboard = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(initialProduct)
  const [editIndex, setEditIndex] = useState(null)
  const [imgPreview, setImgPreview] = useState('')
  const [activeTab, setActiveTab] = useState('products')
  const [stats] = useState({
    totalProducts: 48,
    activeOrders: 12,
    monthlyRevenue: 'LKR 245,800',
    rating: 4.7
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image' && files[0]) {
      const reader = new FileReader()
      reader.onload = (ev) => setImgPreview(ev.target.result)
      reader.readAsDataURL(files[0])
      setForm({ ...form, image: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category || !form.image) return
    
    const productData = { 
      ...form, 
      image: imgPreview,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }

    if (editIndex !== null) {
      const updated = [...products]
      updated[editIndex] = productData
      setProducts(updated)
      setEditIndex(null)
    } else {
      setProducts([...products, productData])
    }
    
    setForm(initialProduct)
    setImgPreview('')
  }

  const handleEdit = (idx) => {
    setForm(products[idx])
    setImgPreview(products[idx].image)
    setEditIndex(idx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (idx) => {
    setProducts(products.filter((_, i) => i !== idx))
    if (editIndex === idx) {
      setForm(initialProduct)
      setImgPreview('')
      setEditIndex(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FiPackage className="text-3xl" />
            <h1 className="text-2xl font-bold">Supplier Portal</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('products')} 
              className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'products' ? 'bg-white text-green-800' : 'hover:bg-green-600'}`}
            >
              My Products
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'analytics' ? 'bg-white text-green-800' : 'hover:bg-green-600'}`}
            >
              Analytics
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white text-green-800 flex items-center justify-center font-bold">
                SP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            { icon: <FiPackage className="text-2xl" />, title: 'Total Products', value: stats.totalProducts },
            { icon: <FiTag className="text-2xl" />, title: 'Active Orders', value: stats.activeOrders },
            { icon: <FiDollarSign className="text-2xl" />, title: 'Monthly Revenue', value: stats.monthlyRevenue },
            { icon: <FiInfo className="text-2xl" />, title: 'Rating', value: `${stats.rating}/5.0` },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4"
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
            >
              <div className="p-3 rounded-lg bg-green-100 text-green-700">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {activeTab === 'products' ? (
          <>
            {/* Product Form */}
            <motion.section
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
            >
              <div className="bg-green-700 px-8 py-4">
                <h2 className="text-xl font-bold text-white">
                  {editIndex !== null ? 'Edit Product' : 'Add New Product'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g. Organic Apples"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Product details, features, etc."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                      <select
                        name="unit"
                        value={form.unit}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {units.map((unit) => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (LKR) *</label>
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                      <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Available quantity"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image {!editIndex && '*'}
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                      <div className="space-y-1 text-center">
                        {imgPreview ? (
                          <img src={imgPreview} alt="Preview" className="mx-auto h-48 w-auto object-contain rounded-lg" />
                        ) : (
                          <>
                            <div className="flex text-gray-400 justify-center">
                              <FiUpload className="text-4xl" />
                            </div>
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input 
                                  type="file" 
                                  name="image"
                                  accept="image/*"
                                  onChange={handleChange}
                                  className="sr-only"
                                  required={!editIndex}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="mt-auto w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <FiPlus />
                    <span>{editIndex !== null ? 'Update Product' : 'Add Product'}</span>
                  </motion.button>
                  
                  {editIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setForm(initialProduct)
                        setImgPreview('')
                        setEditIndex(null)
                      }}
                      className="mt-3 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium text-lg transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </motion.section>

            {/* Product List */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Your Products ({products.length})</h2>
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {products.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                    <FiPackage className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((prod, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      layout
                    >
                      <div className="relative h-48 bg-gray-100">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <button 
                            onClick={() => handleEdit(idx)}
                            className="p-2 bg-white rounded-full shadow-md text-green-600 hover:bg-green-50"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            onClick={() => handleDelete(idx)}
                            className="p-2 bg-white rounded-full shadow-md text-red-600 hover:bg-red-50"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{prod.name}</h3>
                          <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {prod.category}
                            </span>
                            <span className="text-lg font-bold text-green-700">
                              LKR {parseFloat(prod.price).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {prod.description || 'No description provided'}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-3">
                          <span>Stock: {prod.stock || 'N/A'} {prod.unit}</span>
                          <span>Added: {new Date(prod.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto h-24 w-24 text-green-500 mb-6">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Supplier Analytics</h2>
            <p className="text-gray-600 mb-6">Detailed analytics and performance metrics coming soon!</p>
            <button 
              onClick={() => setActiveTab('products')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Back to Products
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center">
                <FiPackage className="mr-2" /> Supplier Portal
              </h3>
              <p className="text-gray-400 mt-1">© 2023 Order.uk. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white">Support</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SupplierDashboard