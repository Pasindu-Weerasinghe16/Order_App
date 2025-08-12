import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBarCart from '../components/NavBarCart';
import { getProducts } from '../api';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      className="flex flex-row items-center bg-gradient-to-r from-white via-emerald-50 to-green-100 rounded-2xl shadow-lg border border-emerald-200 px-8 py-6 min-w-[500px] max-w-3xl mx-auto mb-4 hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-2xl font-bold text-emerald-900 tracking-tight">{product.name}</h3>
          <button
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200
              ${product.discounted
                ? 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200 hover:text-amber-900'
                : 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200 hover:text-emerald-900'}
            `}
            disabled
          >
            {product.discounted ? 'Discounted' : 'Regular Price'}
          </button>
        </div>
        <p className="text-gray-700 text-base mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            className="px-4 py-2 rounded-lg font-bold text-lg border-2 border-emerald-400 bg-white text-emerald-700 hover:bg-emerald-500 hover:text-white transition-all duration-200 shadow-sm"
            disabled
          >
            LKR {product.discounted ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
            {product.discounted && (
              <span className="ml-2 text-gray-400 line-through text-base">LKR {product.price.toFixed(2)}</span>
            )}
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="ml-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md flex items-center gap-2 transition-all duration-200 border-2 border-transparent hover:border-emerald-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m2.35 9.708c-.155.516.232 1.02.772 1.02h12.508a.75.75 0 0 0 .743-.648l1.2-8.4a.75.75 0 0 0-.743-.852H6.28m0 0L5.1 4.272A1.125 1.125 0 0 0 4.013 3.75H2.25m3.75 6.75h13.5m-10.5 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7.5 1.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium capitalize">{product.category}</span>
          {product.tags && product.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">{tag}</span>
          ))}
        </div>
      </div>

      {/* Right badge */}
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
          Dairy Products
        </span>
      </div>
    </motion.div>
  );
};

const FilterSection = ({ title, options, selectedFilters, onFilterChange }) => {
  return (
    <div className="mb-8">
      <h4 className="text-gray-800 text-lg font-semibold mb-4">{title}</h4>
      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-3">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-gray-800/50"
              checked={selectedFilters.includes(option.value)}
              onChange={() => onFilterChange(option.value)}
            />
            <span className="text-slate-800">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([
    { value: 'other', label: 'Other' }
  ]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData.data);
        setFilteredProducts(productsData.data);
        setLoading(false);

        // Collect all unique, normalized categories from data
        const categoriesSet = new Set();
        productsData.data.forEach(product => {
          let cat = (product.category || '').trim();
          if (!cat) cat = 'Other';
          categoriesSet.add(cat);
        });
        // Map known categories to friendly labels, otherwise use raw name
        const friendlyLabels = {
          fruits: 'Fruits & Vegetables',
          snacks: 'Snacks & Beverages',
          meat: 'Meat & Seafood',
          packaged: 'Canned & Packaged Goods',
          bakery: 'Bakery Items',
          other: 'Other'
        };
        const options = Array.from(categoriesSet).map(cat => {
          const key = cat.toLowerCase();
          return {
            value: cat,
            label: friendlyLabels[key] || cat.charAt(0).toUpperCase() + cat.slice(1)
          };
        });
        setCategoryOptions(options);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    let result = [...products];
    // Price filter
    if (priceFilter.length > 0) {
      result = result.filter(product => {
        if (priceFilter.includes('discounted') && product.discounted) return true;
        if (priceFilter.includes('regular') && !product.discounted) return true;
        return false;
      });
    }
    // Category filter (case-insensitive, fallback to 'other' for unknown/empty categories)
    if (categoryFilter.length > 0) {
      result = result.filter(product => {
        let cat = (product.category || '').trim();
        if (!cat || !categoryOptions.some(opt => opt.value === cat)) cat = 'Other';
        return categoryFilter.includes(cat);
      });
    }
    setFilteredProducts(result);
  }, [priceFilter, categoryFilter, products, categoryOptions]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      // You can add a toast notification here for success
    } catch (err) {
      console.error('Error adding to cart:', err);
      // Handle error (show error message)
    }
  };

  const priceOptions = [
    { value: 'discounted', label: 'Discounted' },
    { value: 'regular', label: 'Regular Price' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen w-full relative bg-white overflow-hidden">
        <NavBarCart />
        <div className="container mx-auto px-4 py-8 mt-60 text-center">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full relative bg-white overflow-hidden">
        <NavBarCart />
        <div className="container mx-auto px-4 py-8 mt-60 text-center">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      <NavBarCart />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-60 flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="w-full lg:w-72 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-black text-xl font-semibold mb-6">Filters</h3>
          
          <FilterSection 
            title="Price"
            options={priceOptions}
            selectedFilters={priceFilter}
            onFilterChange={(value) => 
              setPriceFilter(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value) 
                  : [...prev, value]
              )
            }
          />

          <div className="w-full h-px bg-neutral-500/30 my-6"></div>

          <FilterSection 
            title="Category"
            options={categoryOptions}
            selectedFilters={categoryFilter}
            onFilterChange={(value) => 
              setCategoryFilter(prev => 
                prev.includes(value) 
                  ? prev.filter(v => v !== value) 
                  : [...prev, value]
              )
            }
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-xl">No products match your filters</p>
              <button 
                onClick={() => {
                  setPriceFilter([]);
                  setCategoryFilter([]);
                }}
                className="mt-4 text-amber-500 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

// Cart Item Display (for cartItems.map)
{cartItems.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-xl">Your cart is empty</p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {cartItems.map((item) => (
      <motion.div
        key={item.id}
        className="flex flex-row items-center bg-gradient-to-r from-white via-emerald-50 to-green-100 rounded-2xl shadow-lg border border-emerald-200 px-8 py-6 min-w-[350px] max-w-3xl mx-auto mb-4 hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ y: -4, scale: 1.01 }}
      >
        <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center shadow-md border border-emerald-100 mr-6">
          <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
          </svg>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-2xl font-bold text-emerald-900 tracking-tight">{item.name}</h3>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium capitalize">{item.category}</span>
          </div>
          <p className="text-gray-700 text-base mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xl font-extrabold text-emerald-700">LKR {item.price}</span>
            <div className="flex items-center gap-2 ml-4">
              <button className="px-2 py-1 bg-emerald-200 rounded-l hover:bg-emerald-300 text-emerald-900 font-bold" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span className="px-4 text-lg font-semibold">{item.quantity}</span>
              <button className="px-2 py-1 bg-emerald-200 rounded-r hover:bg-emerald-300 text-emerald-900 font-bold" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button className="ml-4 px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-red-600 font-bold" onClick={() => removeItem(item.id)}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)}