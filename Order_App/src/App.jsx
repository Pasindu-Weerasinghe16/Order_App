import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BrowseMenu from './pages/BrowseMenu'
import Cart from './pages/Cart'
import ContactUs from './pages/ContactUs'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <div className="font-['Poppins']">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-menu" element={<BrowseMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App