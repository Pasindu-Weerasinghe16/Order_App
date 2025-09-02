import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <>
      {/* Corrected image path for Vite public folder usage */}
      {/* Simple Image Slider */}
      {(() => {
        const images = [
          '/Assets/main_banner_bg.jpg',
          '/Assets/SignIn_bg.jpg',
          '/Assets/slide2.jpg',
        ];
        const [current, setCurrent] = React.useState(0);
        React.useEffect(() => {
          const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
          }, 6000);
          return () => clearInterval(interval);
        }, [images.length]);
        return (
          <div className="absolute left-[189px] top-[244px] w-[1541px] aspect-[1541/939] rounded-[48px] overflow-hidden shadow-lg group">
            <img
              src={images[current]}
              alt="hero banner"
              className="w-full h-full object-contain transition-all duration-300"
              style={{ borderRadius: 48 }}
            />
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${current === idx ? 'bg-amber-500' : 'bg-white/60'} border border-amber-300 transition`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        );
      })()}
      <div className="absolute left-[400px] top-[510px] flex flex-col gap-4 z-20">
        <div>
          <motion.div
            whileHover={{ y: -10, opacity: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="cursor-pointer"
          >
            <span className="text-white text-5xl font-semibold font-['Poppins'] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Feast Your Senses, </span>
            <span className="text-amber-500 text-5xl font-semibold font-['Poppins'] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Fast and Fresh</span>
          </motion.div>
        </div>
        <div className="text-white text-lg font-normal font-['Poppins'] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Order Restaurant food, takeaway and groceries.</div>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="e.g. EC4R 3TE"
            className="w-72 h-12 px-5 rounded-full border border-black/30 text-base font-normal font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-amber-400 transition bg-white placeholder:text-gray-400"
          />
          <button
            className="h-12 px-8 bg-amber-500 rounded-full text-white text-base font-bold font-['Poppins'] shadow hover:bg-amber-600 transition-colors duration-200"
          >
            Search
          </button>
        </div>
        <div className="text-slate-950 text-xs font-normal font-['Poppins'] mt-2">Enter a postcode to see what we deliver</div>
      </div>
      {/* Animated Delivery Time Box */}
      <div className="absolute left-[1250px] top-[1074px] flex items-center gap-3 px-6 py-3 bg-white/90 rounded-[120px] shadow border border-amber-100 hover:shadow-lg transition duration-200 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7 text-amber-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-amber-600 text-lg font-semibold font-['Poppins']">
          Delivery in <span className="text-red-600">20-25</span> Minutes
        </span>
      </div>
      {/* Corrected timer icon path for Vite public folder usage */}
      {/* Timer icon using react-icons */}
     
    </>
  );
};

export default HeroSection;