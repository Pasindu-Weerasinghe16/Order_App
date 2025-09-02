const HeroSection = () => {
  return (
    <>
      {/* Corrected image path for Vite public folder usage */}
      <img
        className="w-[1541px] left-[189px] top-[244px] absolute rounded-[48px] object-contain aspect-[1541/939]"
        src="/Assets/main_banner_bg.jpg"
        alt="hero banner"
        style={{ height: 'auto' }}
      />
      <div className="absolute left-[400px] top-[510px] flex flex-col gap-4">
        <div>
          <span className="text-white text-5xl font-semibold font-['Poppins'] leading-tight">Feast Your Senses, </span>
          <span className="text-amber-500 text-5xl font-semibold font-['Poppins'] leading-tight">Fast and Fresh</span>
        </div>
        <div className="text-white text-lg font-normal font-['Poppins']">Order Restaurant food, takeaway and groceries.</div>
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