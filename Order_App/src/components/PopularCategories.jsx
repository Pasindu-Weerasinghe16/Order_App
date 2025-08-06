const PopularCategories = () => {
  return (
    <div className="relative">
      <div className="left-[186px] top-[1217px] absolute justify-start text-black text-3xl font-bold font-['Poppins']">
        Order Popular Categories
      </div>
      
      {/* Category Container */}
      <div className="flex flex-wrap justify-center gap-8 absolute left-[182px] top-[1317px]">
        {/* Category 1 - Green */}
        <div className="group w-60 h-64 bg-neutral-100 rounded-xl border border-black/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-green-100 hover:bg-green-50">
          <div className="relative overflow-hidden">
            <img 
              className="w-full h-52 object-cover rounded-tl-xl rounded-tr-xl transition-transform duration-500 group-hover:scale-110" 
              src="/Assets/tom-paolini-nXKDqpmdx_8-unsplash.jpg" 
              alt="fruits & vegetables" 
            />
          </div>
          <div className="p-4 text-slate-950 text-lg font-bold font-['Poppins'] transition-colors duration-300 group-hover:text-green-600">
            Fruits & Vegetables
          </div>
        </div>
        
        {/* Category 2 - Orange */}
        <div className="group w-60 h-64 bg-neutral-100 rounded-xl border border-black/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-orange-100 hover:bg-orange-50">
          <div className="relative overflow-hidden">
            <img 
              className="w-full h-52 object-cover rounded-tl-xl rounded-tr-xl transition-transform duration-500 group-hover:scale-110" 
              src="/Assets/Pic_16.jpg" 
              alt="snacks & beverages" 
            />
          </div>
          <div className="p-4 text-slate-950 text-lg font-bold font-['Poppins'] transition-colors duration-300 group-hover:text-orange-600">
            Snacks & Beverages
          </div>
        </div>
        
        {/* Category 3 - Green */}
        <div className="group w-60 h-64 bg-neutral-100 rounded-xl border border-black/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-green-100 hover:bg-green-50">
          <div className="relative overflow-hidden">
            <img 
              className="w-full h-52 object-cover rounded-tl-xl rounded-tr-xl transition-transform duration-500 group-hover:scale-110" 
              src="/Assets/pic_17.jpg" 
              alt="meat & seafood" 
            />
          </div>
          <div className="p-4 text-slate-950 text-lg font-bold font-['Poppins'] transition-colors duration-300 group-hover:text-green-600">
            Meat & Seafood
          </div>
        </div>
        
        {/* Category 4 - Orange */}
        <div className="group w-60 h-64 bg-neutral-100 rounded-xl border border-black/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-orange-100 hover:bg-orange-50">
          <div className="relative overflow-hidden">
            <img 
              className="w-full h-52 object-cover rounded-tl-xl rounded-tr-xl transition-transform duration-500 group-hover:scale-110" 
              src="/Assets/pic_18.jpg" 
              alt="dairy products" 
            />
          </div>
          <div className="p-4 text-slate-950 text-lg font-bold font-['Poppins'] transition-colors duration-300 group-hover:text-orange-600">
            Dairy Products
          </div>
        </div>
        
        {/* Category 5 - Green */}
        <div className="group w-60 h-64 bg-neutral-100 rounded-xl border border-black/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-green-100 hover:bg-green-50">
          <div className="relative overflow-hidden">
            <img 
              className="w-full h-52 object-cover rounded-tl-xl rounded-tr-xl transition-transform duration-500 group-hover:scale-110" 
              src="/Assets/pic_19.jpg" 
              alt="packaged goods" 
            />
          </div>
          <div className="p-4 text-center text-slate-950 text-lg font-bold font-['Poppins'] transition-colors duration-300 group-hover:text-green-600">
            Canned & Packaged Goods
          </div>
        </div>
        
        {/* Category 6 - Orange */}
        <div className="group w-60 h-64 bg-neutral-100 rounded-xl border border-black/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-orange-100 hover:bg-orange-50">
          <div className="relative overflow-hidden">
            <img 
              className="w-full h-52 object-cover rounded-tl-xl rounded-tr-xl transition-transform duration-500 group-hover:scale-110" 
              src="/Assets/pic_20.jpg" 
              alt="bakery items" 
            />
          </div>
          <div className="p-4 text-slate-950 text-lg font-bold font-['Poppins'] transition-colors duration-300 group-hover:text-orange-600">
            Bakery Items
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;