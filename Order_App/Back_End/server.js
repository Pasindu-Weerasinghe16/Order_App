const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('colors'); // Enables colored console logs

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/error');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Enable CORS
app.use(cors());

// Body parser middleware (to read JSON body)
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Get PORT from .env or use 5000
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
