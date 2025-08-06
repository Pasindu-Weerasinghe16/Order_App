const OffersSection = () => {
  return (
    <div className="relative">
      <div className="left-[186px] top-[1633px] absolute justify-start text-black text-3xl font-bold font-['Poppins']">
        Special Offers for Your Next Order
      </div>
      
      {/* Offers Container */}
      <div className="flex flex-wrap justify-center gap-6 absolute left-[176px] top-[1731px]">
        {/* First Offer */}
        <div className="group relative w-[496px] h-80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <img 
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" 
            src="/Assets/first_order_dis.jpg" 
            alt="First order discount" 
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-white/0 via-slate-950/20 to-slate-950/90 rounded-xl" />
          <div className="absolute left-6 bottom-16 text-amber-400 text-lg font-medium font-['Poppins']">
            Limited Time Offer
          </div>
          <div className="absolute left-6 bottom-6 text-white text-3xl font-bold font-['Poppins']">
            First Order Discount
          </div>
          <div className="absolute top-0 right-0 w-20 h-16 bg-slate-900 rounded-bl-xl rounded-br-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">-20%</span>
          </div>
          <div className="absolute right-6 bottom-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Second Offer */}
        <div className="group relative w-[496px] h-80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <img 
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" 
            src="/Assets/VeganDiscount.jpg" 
            alt="Vegan discount" 
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-white/0 via-slate-950/20 to-slate-950/90 rounded-xl" />
          <div className="absolute left-6 bottom-16 text-emerald-400 text-lg font-medium font-['Poppins']">
            Vegan Special
          </div>
          <div className="absolute left-6 bottom-6 text-white text-3xl font-bold font-['Poppins']">
            Plant-Based Discount
          </div>
          <div className="absolute top-0 right-0 w-20 h-16 bg-slate-900 rounded-bl-xl rounded-br-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">-20%</span>
          </div>
          <div className="absolute right-6 bottom-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Third Offer */}
        <div className="group relative w-[496px] h-80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <img 
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" 
            src="/Assets/FreeiceCream.jpg" 
            alt="Free ice cream" 
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-white/0 via-slate-950/20 to-slate-950/90 rounded-xl" />
          <div className="absolute left-6 bottom-16 text-cyan-300 text-lg font-medium font-['Poppins']">
            Sweet Deal
          </div>
          <div className="absolute left-6 bottom-6 text-white text-3xl font-bold font-['Poppins']">
            Free Ice Cream
          </div>
          <div className="absolute top-0 right-0 w-20 h-16 bg-slate-900 rounded-bl-xl rounded-br-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">FREE</span>
          </div>
          <div className="absolute right-6 bottom-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;