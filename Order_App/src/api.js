import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (firstName, lastName, email, password) => 
  api.post('/auth/register', { firstName, lastName, email, password });
export const registerSupplier = (companyName, contactPerson, email, password) => 
  api.post('/auth/register-supplier', { companyName, contactPerson, email, password });
export const getProfile = () => api.get('/auth/profile');

// Products API
export const getProducts = (category, discounted) => 
  api.get('/products', { params: { category, discounted } });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getFlashSaleProducts = () => api.get('/products/flash-sale');

// Cart API
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => api.post('/cart', { productId, quantity });
export const updateCartItem = (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity });
export const removeFromCart = (itemId) => api.delete(`/cart/${itemId}`);
export const clearCart = () => api.delete('/cart');

// Orders API
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getMyOrders = () => api.get('/orders/myorders');
export const updateOrderToPaid = (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult);

export default api;