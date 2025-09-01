// Supplier analytics
export const getSupplierProfit = (email) => api.get(`/orders/supplier-profit?email=${encodeURIComponent(email)}`);
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// No token attached for public endpoints

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
// (Removed duplicate createProduct export)
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getFlashSaleProducts = () => api.get('/products/flash-sale');

// Cart API
export const createProduct = (productData) => {
  // If productData is FormData, send as multipart/form-data
  if (productData instanceof FormData) {
    return api.post('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
  return api.post('/products', productData);
};
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => api.post('/cart', { productId, quantity });
export const updateCartItem = (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity });
export const removeFromCart = (itemId) => api.delete(`/cart/${itemId}`);
export const clearCart = () => api.delete('/cart');

// Orders API
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getMyOrders = (userEmail) => {
  if (userEmail) {
    return api.get(`/orders/myorders?userEmail=${encodeURIComponent(userEmail)}`);
  }
  return api.get('/orders/myorders');
};
export const updateOrderToPaid = (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult);

export default api;