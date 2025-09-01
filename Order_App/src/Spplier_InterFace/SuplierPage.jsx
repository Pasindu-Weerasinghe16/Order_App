import { useState, useEffect } from 'react'
import { createProduct, getProducts, updateProduct, deleteProduct } from '../api';
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiDollarSign, FiTag, FiInfo } from 'react-icons/fi'

const initialProduct = {
  name: '',
  description: '',
  price: '',
  category: '',
  // image: '',
  stock: '',
  unit: 'kg',
  discounted: false,
  discountPrice: ''
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

const Productes = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(initialProduct)
  const [editIndex, setEditIndex] = useState(null)
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  // Removed analytics tab, only product management remains
  const [showForm, setShowForm] = useState(false)
  const [stats] = useState({
    totalProducts: 48,
    activeOrders: 12,
    monthlyRevenue: 'LKR 245,800',
    rating: 4.7
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for discounted select
    if (name === 'discounted') {
      setForm({ ...form, discounted: value === 'true' });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      alert('Please fill in all required fields.');
      return;
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
    }
    try {
      let res;
      if (editIndex !== null && products[editIndex]?._id) {
        // Update (no image upload for update in this logic)
        const productData = {
          name: form.name,
          description: form.description,
          category: form.category,
          price: parseFloat(form.price),
          stock: parseInt(form.stock) || 0,
          unit: form.unit,
          discounted: !!form.discounted,
          discountPrice: form.discounted ? parseFloat(form.discountPrice) : undefined
        };
        res = await updateProduct(products[editIndex]._id, productData);
        const updated = [...products];
        updated[editIndex] = res.data;
        setProducts(updated);
        alert('Product updated successfully!');
      } else {
        // Insert with image
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('category', form.category);
        formData.append('price', parseFloat(form.price));
        formData.append('stock', parseInt(form.stock) || 0);
        formData.append('unit', form.unit);
        formData.append('discounted', !!form.discounted);
        if (form.discounted) formData.append('discountPrice', parseFloat(form.discountPrice));
        if (imageFile) formData.append('image', imageFile);
        res = await createProduct(formData);
        setProducts([...products, res.data]);
        alert('Product added successfully!');
      }
      setForm(initialProduct);
      setImageFile(null);
      setImgPreview('');
      setEditIndex(null);
      setShowForm(false);
    } catch (err) {
      alert('Failed to save product.');
    }
  }

  const handleEdit = (id) => {
    const idx = products.findIndex((p) => p._id === id);
    if (idx === -1) return;
    setForm({ ...products[idx], discountPrice: products[idx].discountPrice || '' });
    setEditIndex(idx);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const idx = products.findIndex((p) => p._id === id);
    if (idx === -1) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      if (editIndex === idx) {
        setForm(initialProduct);
        setEditIndex(null);
        setShowForm(false);
      }
    } catch (err) {
      alert('Failed to delete product.');
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-7 flex justify-between items-center">
        {/* ↑ changed py-6 to py-7 for a bit more bottom padding */}
          <div className="flex items-center space-x-4">
            <FiPackage className="text-3xl" />
  <h1 className="text-2xl font-bold">Products</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => { setShowForm(false); }}
              className="px-4 py-2 rounded-lg font-medium bg-white text-green-800"
            >
              Products
            </button>
            <button
              onClick={() => { setShowForm(true); setForm(initialProduct); setEditIndex(null); }}
              className="flex items-center px-4 py-2 rounded-lg font-medium bg-green-500 hover:bg-green-600 text-white"
            >
              <FiPlus className="mr-2" /> Add Product
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white text-green-800 flex items-center justify-center font-bold">
                {(() => {
                  try {
                    const raw = localStorage.getItem('userInfo');
                    if (raw) return (JSON.parse(raw).email || 'U').charAt(0).toUpperCase();
                  } catch (e) {}
                  return 'U';
                })()}
              </div>
              <div className="text-xs text-green-100">
                {(() => {
                  try {
                    const raw = localStorage.getItem('userInfo');
                    if (raw) return JSON.parse(raw).email || 'Guest';
                  } catch (e) {}
                  return 'Guest';
                })()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {/* Product Form */}
        {showForm && (
              <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 10 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-green-200"
              >
                <div className="bg-green-700 px-8 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">
                    {editIndex !== null ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setForm(initialProduct); setEditIndex(null); }}
                    className="text-white bg-green-900 hover:bg-green-800 px-3 py-1 rounded-lg font-medium"
                  >
                    Close
                  </button>
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
                    {/* Discount Section */}
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Discounted?</label>
                        <select
                          name="discounted"
                          value={form.discounted ? 'true' : 'false'}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                      {form.discounted && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price</label>
                          <input
                            type="number"
                            name="discountPrice"
                            value={form.discountPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Discounted price"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    {/* Image upload input */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files[0];
                        setImageFile(file);
                        if (file) setImgPreview(URL.createObjectURL(file));
                        else setImgPreview('');
                      }}
                      className="mb-4"
                    />
                    {imgPreview && (
                      <img src={imgPreview} alt="Preview" className="mb-4 rounded-lg border w-32 h-32 object-cover" />
                    )}
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
                          setImageFile(null)
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
            )}

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
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first products.</p>
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
                      key={prod._id || idx}
                      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      layout
                    >
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={prod.image ? (prod.image.startsWith('http') ? prod.image : `http://localhost:5000${prod.image}`) : '/default-product.png'}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.onerror = null; e.target.src = '/default-product.png'; }}
                        />
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <button 
                            type="button"
                            onClick={() => handleEdit(prod._id)}
                            className="p-2 bg-white rounded-full shadow-md text-green-600 hover:bg-green-50"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDelete(prod._id)}
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center">
                <FiPackage className="mr-2" /> Products
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

export default Productes