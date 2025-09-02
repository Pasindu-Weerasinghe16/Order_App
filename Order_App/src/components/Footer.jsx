import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUtensils } from 'react-icons/fa';


const Footer = () => {
  return (
    <div style={{ width: '1920px', position: 'absolute', top: '3556px', left: 0 }}>
      <footer className="bg-gradient-to-r from-amber-100 to-amber-200 border-t border-amber-300 py-12 mt-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaUtensils className="text-amber-500 text-3xl" />
              <span className="text-3xl font-extrabold text-amber-600">Order</span>
            </div>
            <p className="text-slate-700 text-sm mb-4">Order Copyright 2024, All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-800 text-2xl"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter" className="text-sky-500 hover:text-sky-700 text-2xl"><FaTwitter /></a>
              <a href="#" aria-label="Instagram" className="text-pink-500 hover:text-pink-700 text-2xl"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="text-blue-800 hover:text-blue-900 text-2xl"><FaLinkedinIn /></a>
            </div>
          </div>
          <div>
            <h4 className="text-slate-950 text-lg font-bold mb-4">Get Exclusive Deals in your Inbox</h4>
            <div className="flex">
              <input type="email" placeholder="youremail@gmail.com" className="flex-1 bg-white rounded-l-full px-6 py-3 border border-black/20" />
              <button className="bg-amber-500 text-white px-6 py-3 rounded-r-full font-medium">Subscribe</button>
            </div>
            <p className="text-slate-700 text-xs mt-2">We won't spam, read our <span className="underline">email policy</span></p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-slate-950 text-lg font-bold mb-4">Important Links</h4>
              <ul className="space-y-2 text-black ">
                <li>Get help</li>
                <li>Add your restaurant</li>
                <li>Sign up to deliver</li>
                <li>Create a business account</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-950 text-lg font-bold mb-4">Legal Pages</h4>
              <ul className="space-y-2 text-black ">
                <li>Terms and conditions</li>
                <li>Privacy</li>
                <li>Cookies</li>
                <li>Modern Slavery Statement</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;