import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SignUpSupplierPage from './pages/SignUpSupplierPage';
import ContactUsPage from './pages/ContactUsPage';
import FlashSalePage from './pages/FlashSalePage';
import SupplierDashboard from './Spplier_InterFace/SuplierPage';
import CartPage from './pages/CartPage';
import { useState, useEffect } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    const updateUserInfo = () => {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    };
    updateUserInfo();
    window.addEventListener('storage', updateUserInfo);
    window.addEventListener('userInfo_updated', updateUserInfo);
    return () => {
      window.removeEventListener('storage', updateUserInfo);
      window.removeEventListener('userInfo_updated', updateUserInfo);
    };
  }, []);

  return (
    <div className="font-['Poppins']">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Cart />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Removed /login route, use only / for login */}
        <Route path="/supplier-signup" element={<SignUpSupplierPage />} />
        <Route path="/flash-sale" element={<FlashSalePage />} />
        <Route 
          path="/supplier" 
          element={userInfo?.isSupplier ? <SupplierDashboard /> : <Navigate to="/" replace />} 
        />
        <Route path="/cart-page" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;