import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBarCart from '../components/NavBarCart';
import { getProducts } from '../api';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg border border-black/10 p-8 flex flex-row gap-8 min-w-[400px] max-w-2xl mx-auto"
      whileHover={{ y: -5 }}
    >
      <div className="flex-shrink-0 w-52 h-52 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-black text-2xl font-semibold">{product.name}</h3>
          <p className="text-black text-base mt-2">{product.description}</p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-slate-950 text-xl font-bold">
            LKR {product.discounted ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
            {product.discounted && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                LKR {product.price.toFixed(2)}
              </span>
            )}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-green-700 text-white p-3 rounded-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m2.35 9.708c-.155.516.232 1.02.772 1.02h12.508a.75.75 0 0 0 .743-.648l1.2-8.4a.75.75 0 0 0-.743-.852H6.28m0 0L5.1 4.272A1.125 1.125 0 0 0 4.013 3.75H2.25m3.75 6.75h13.5m-10.5 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7.5 1.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
            </svg>
          </button>
        </div>
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

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData.data);
        setFilteredProducts(productsData.data);
        setLoading(false);
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
    
    if (priceFilter.length > 0) {
      result = result.filter(product => {
        if (priceFilter.includes('discounted') && product.discounted) return true;
        if (priceFilter.includes('regular') && !product.discounted) return true;
        return false;
      });
    }
    
    if (categoryFilter.length > 0) {
      result = result.filter(product => 
        categoryFilter.includes(product.category.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [priceFilter, categoryFilter, products]);

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

  const categoryOptions = [
    { value: 'fruits', label: 'Fruits & Vegetables' },
    { value: 'snacks', label: 'Snacks & Beverages' },
    { value: 'meat', label: 'Meat & Seafood' },
    { value: 'packaged', label: 'Canned & Packaged Goods' },
    { value: 'bakery', label: 'Bakery Items' },
    { value: 'other', label: 'Other' }
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