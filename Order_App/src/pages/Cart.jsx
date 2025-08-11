import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBarCart from '../components/NavBarCart';
import { getProducts } from '../api';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="rounded-xl shadow-md border p-6 flex items-center gap-6 bg-orange-50 border-orange-200">
      {/* Left accent bar */}
      <div className="w-2 h-32 rounded-md bg-orange-600"></div>

      {/* Main content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          {/* Left side */}
          <div>
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              {/* Title & Description */}
              <div>
                <h3 className="text-slate-900 text-xl font-semibold">{product.name}</h3>
                <div className="mt-1 text-sm text-slate-600">{product.description}</div>
              </div>
            </div>
          </div>

          {/* Right badge */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {product.category}
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-slate-900">
              LKR {product.discounted ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
              {product.discounted && (
                <span className="ml-2 text-gray-400 line-through text-base">
                  LKR {product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="font-medium">Add</span>
            </button>

            {/* View Link */}
            <Link
              className="text-sm text-slate-700 underline"
              to={`/product/${product._id}`}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
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