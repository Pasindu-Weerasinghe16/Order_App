const HeroSection = () => {
  return (
    <>
      {/* Corrected image path for Vite public folder usage */}
      <img
        className="w-[1541px] h-[939px] left-[189px] top-[244px] absolute rounded-[48px]"
        src="/Assets/main_banner_bg.jpg"
        alt="hero banner"
      />
      <div className="left-[268px] top-[563px] absolute justify-start">
        <span className="text-white text-5xl font-semibold font-['Poppins'] leading-[66px]">Feast Your Senses,</span>
        <span className="text-amber-500 text-5xl font-semibold font-['Poppins'] leading-[66px]">Fast and Fresh</span>
      </div>
      <div className="left-[268px] top-[510px] absolute justify-start text-white text-base font-normal font-['Poppins'] leading-[66px]">
        Order Restaurant food, takeaway and groceries.
      </div>
      <div className="w-72 h-11 left-[268px] top-[707px] absolute justify-start text-slate-950 text-xs font-normal font-['Poppins'] leading-[66px]">
        Enter a postcode to see what we deliver
      </div>
      <div className="w-96 h-14 left-[268px] top-[762px] absolute bg-white rounded-[120px] border border-black/40" />
      <div className="w-48 h-14 left-[477px] top-[762px] absolute bg-amber-500 rounded-[120px] transition-transform duration-200 hover:scale-105 hover:bg-amber-600 cursor-pointer" />
      <div className="left-[543px] top-[758px] absolute justify-start text-white text-base font-bold font-['Poppins'] leading-[66px]">
        Search
      </div>
      <div className="w-28 h-14 left-[296px] top-[759px] absolute justify-start text-black/80 text-base font-normal font-['Poppins'] leading-[66px]">
        e.g. EC4R 3TE
      </div>
      <div className="w-80 h-16 left-[1334px] top-[1074px] absolute bg-white rounded-[120px] border border-white" />
      <div className="w-14 h-9 left-[1352px] top-[1088px] absolute bg-black rounded-2xl" />
      <div className="left-[1415px] top-[1071px] absolute justify-start text-red-600 text-lg font-semibold font-['Poppins'] leading-[66px]">
        Delivery in 20-25 Minutes
      </div>
      {/* Corrected timer icon path for Vite public folder usage */}
      {/* Timer icon using react-icons */}
      <span className="w-8 h-8 left-[1364px] top-[1089px] absolute text-red-600 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </>
  );
};

export default HeroSection;