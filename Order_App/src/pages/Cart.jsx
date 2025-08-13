import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBarCart from '../components/NavBarCart';
import { getProducts } from '../api';

/* --- Local storage helpers (shared) --- */
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
    // dispatch custom event so other components can respond immediately
    window.dispatchEvent(new CustomEvent('cart_updated', { detail: cart }));
  } catch (e) {
    console.error('Failed to save cart', e);
  }
};

/* --- Product Card (orange theme, uniform height) --- */
const ProductCard = ({ product, onAddToCart }) => {
  const formatPrice = (price) => (typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : '0.00');
  const isDiscounted = Boolean(product.discounted);
  const displayPrice = isDiscounted && product.discountPrice ? product.discountPrice : product.price;
  const discountPercent = isDiscounted && product.price ? Math.round((1 - (displayPrice / product.price)) * 100) : 0;

  return (
    <motion.div
      className="relative flex h-full flex-col justify-between bg-gradient-to-r from-white via-amber-50 to-orange-50 rounded-2xl shadow-lg border border-orange-100 p-5 overflow-hidden"
      whileHover={{ translateY: -6 }}
    >
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-gradient-to-b from-orange-400 to-amber-400" />

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden bg-orange-50 border border-orange-100 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-12 h-12 text-orange-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 3.5a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-semibold text-orange-900 truncate">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product.description || 'Fresh & high quality.'}</p>

              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-orange-700 font-extrabold text-lg">LKR {formatPrice(displayPrice)}</span>
                  {isDiscounted && <span className="text-gray-400 line-through text-sm">LKR {formatPrice(product.price)}</span>}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium capitalize">
                    {product.category || 'General'}
                  </span>
                  {product.tags && product.tags.length > 0 && (
                    <span className="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-full">{product.tags[0]}</span>
                  )}
                  {isDiscounted && discountPercent > 0 && (
                    <span className="text-xs bg-amber-100 text-amber-900 px-2 py-1 rounded-full font-semibold">-{discountPercent}%</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between ml-2">
              <div className="flex items-center gap-2">
                {product.stock !== undefined && (
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.stock > 10 ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                      product.stock > 3 ? 'bg-amber-50 text-amber-800 border border-amber-100' :
                      'bg-red-50 text-red-700 border border-red-100'
                    }`}
                  >
                    {product.stock > 10 ? 'In stock' : product.stock > 3 ? 'Low stock' : 'Almost gone'}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  className="px-3 py-1 rounded-lg text-sm font-semibold border border-orange-200 bg-white text-orange-700 shadow-sm"
                  disabled
                  aria-hidden
                >
                  LKR {formatPrice(displayPrice)}
                </button>

                <button
                  onClick={() => onAddToCart(product)}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-transform active:scale-95"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                    <circle cx="10" cy="19" r="1" />
                    <circle cx="18" cy="19" r="1" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-3 top-3 rounded px-2 py-0.5 bg-white/40 text-xs text-gray-600 border border-white/30">SuperMart</div>
    </motion.div>
  );
};

/* --- FilterSection (unchanged) --- */
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

/* --- ProductPage main --- */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([{ value: 'other', label: 'Other' }]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData.data);
        setFilteredProducts(productsData.data);
        setLoading(false);

        const categoriesSet = new Set();
        productsData.data.forEach(product => {
          let cat = (product.category || '').trim();
          if (!cat) cat = 'Other';
          categoriesSet.add(cat);
        });

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

  useEffect(() => {
    let result = [...products];
    if (priceFilter.length > 0) {
      result = result.filter(product => {
        if (priceFilter.includes('discounted') && product.discounted) return true;
        if (priceFilter.includes('regular') && !product.discounted) return true;
        return false;
      });
    }
    if (categoryFilter.length > 0) {
      result = result.filter(product => {
        let cat = (product.category || '').trim();
        if (!cat || !categoryOptions.some(opt => opt.value === cat)) cat = 'Other';
        return categoryFilter.includes(cat);
      });
    }
    setFilteredProducts(result);
  }, [priceFilter, categoryFilter, products, categoryOptions]);

  // Add to cart -> localStorage (shared)
  const handleAddToCart = (product) => {
    try {
      const cart = getCartFromStorage();
      const idx = cart.findIndex(item => item.product._id === product._id);
      if (idx !== -1) {
        cart[idx].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }
      saveCartToStorage(cart);
      setToast(`${product.name} added to cart`);
      setTimeout(() => setToast(null), 1800);
    } catch (e) {
      console.error(e);
      setToast('Failed to add to cart');
      setTimeout(() => setToast(null), 1800);
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
        <div className="container mx-auto px-4 py-8 mt-60 text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full relative bg-white overflow-hidden">
        <NavBarCart />
        <div className="container mx-auto px-4 py-8 mt-60 text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden">
      <NavBarCart />

      <div className="container mx-auto px-4 py-8 mt-60 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-72 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-black text-xl font-semibold mb-6">Filters</h3>

          <FilterSection
            title="Price"
            options={priceOptions}
            selectedFilters={priceFilter}
            onFilterChange={(value) =>
              setPriceFilter(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]))
            }
          />

          <div className="w-full h-px bg-neutral-500/30 my-6"></div>

          <FilterSection
            title="Category"
            options={categoryOptions}
            selectedFilters={categoryFilter}
            onFilterChange={(value) =>
              setCategoryFilter(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]))
            }
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="h-full">
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
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

      {/* Simple toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 z-50 bg-orange-50 border-l-4 border-orange-400 text-orange-800 p-3 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
