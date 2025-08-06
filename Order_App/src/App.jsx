
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SignUpSupplierPage from './pages/SignUpSupplierPage'
import ContactUsPage from './pages/ContactUsPage'

import FlashSalePage from './pages/FlashSalePage'

import SupplierDashboard from './Spplier_InterFace/SuplierPage'

function App() {
  return (
    <div className="font-['Poppins']">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Cart />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/supplier-signup" element={<SignUpSupplierPage />} />
        <Route path="/flash-sale" element={<FlashSalePage />} />
        <Route path="/supplier" element={<SupplierDashboard />} />
      </Routes>
    </div>
  )
}

export default App