import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BrowseMenu from './pages/BrowseMenu'
import Cart from './pages/Cart'
import ContactUs from './pages/ContactUs'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SignUpSupplierPage from './pages/SignUpSupplierPage'

function App() {
  return (
    <div className="font-['Poppins']">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-menu" element={<BrowseMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/supplier-signup" element={<SignUpSupplierPage />} />
      </Routes>
    </div>
  )
}

export default App