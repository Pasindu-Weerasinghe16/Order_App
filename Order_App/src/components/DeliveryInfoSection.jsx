const DeliveryInfoSection = () => {
  return (
    <>
      <div className="w-[1528px] h-[659px] left-[196px] top-[2135px] absolute bg-neutral-50 rounded-xl shadow-[5px_5px_14px_0px_rgba(0,0,0,0.25)]" />
      <div className="w-[496px] h-[659px] left-[1218px] top-[2135px] absolute bg-slate-950 rounded-tr-xl rounded-br-xl shadow-[5px_5px_14px_0px_rgba(0,0,0,0.25)]" />
      
      <div className="w-[577px] h-[549px] left-[242px] top-[2202px] absolute flex flex-col justify-center">
        <span className="text-slate-950 text-3xl font-bold font-['Poppins'] leading-[48px] mb-4">Delivery information</span>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2"><span className="text-black text-lg font-bold font-['Poppins'] leading-10">Monday:</span><span className="text-black text-lg font-normal font-['Poppins'] leading-10">12:00 AM–3:00 AM, 8:00 AM–3:00 AM</span></div>
          <div className="flex items-center gap-2"><span className="text-black text-lg font-bold font-['Poppins'] leading-10">Tuesday:</span><span className="text-black text-lg font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
          <div className="flex items-center gap-2"><span className="text-black text-lg font-bold font-['Poppins'] leading-10">Wednesday:</span><span className="text-black text-lg font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
          <div className="flex items-center gap-2"><span className="text-black text-lg font-bold font-['Poppins'] leading-10">Thursday:</span><span className="text-black text-lg font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
          <div className="flex items-center gap-2"><span className="text-black text-lg font-bold font-['Poppins'] leading-10">Friday:</span><span className="text-black text-lg font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
          <div className="flex items-center gap-2"><span className="text-black text-lg font-bold font-['Poppins'] leading-10">Saturday:</span><span className="text-black text-lg font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
          <div className="flex items-center gap-2"><span className="text-black text-lg font-bold font-['Poppins'] leading-10">Sunday:</span><span className="text-black text-lg font-normal font-['Poppins'] leading-10">8:00 AM–12:00 AM</span></div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-black text-lg font-bold font-['Poppins'] leading-10">Estimated time until delivery:</span>
          <span className="text-black text-lg font-normal font-['Poppins'] leading-10">20 min</span>
        </div>
      </div>
      
      <div className="w-96 h-10 left-[795px] top-[2257px] absolute justify-center text-slate-950 text-3xl font-bold font-['Poppins'] leading-[48px]">Contact information</div>
      <div className="w-96 h-72 left-[746px] top-[2394px] absolute justify-center">
        <span className="text-black text-lg font-normal font-['Poppins'] leading-10">If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.<br/></span>
        <span className="text-black text-lg font-bold font-['Poppins'] leading-10">Phone number<br/></span>
        <span className="text-slate-950 text-2xl font-normal font-['Poppins'] leading-[48px]">+94774256972<br/></span>
        <span className="text-black text-lg font-bold font-['Poppins'] leading-10">Website<br/></span>
        <span className="text-slate-950 text-2xl font-normal font-['Poppins'] leading-[48px]">http://order.lk/<br/></span>
      </div>
      
      <img className="w-11 h-11 left-[233px] top-[2254px] absolute" src="/assets/pic_45.png" alt="delivery icon" />
      <img className="w-11 h-11 left-[739px] top-[2254px] absolute" src="/assets/pic_46.png" alt="contact icon" />
      
      <div className="w-96 h-10 left-[1341px] top-[2257px] absolute justify-center text-white text-3xl font-bold font-['Poppins'] leading-[48px]">Operational Times</div>
      <div className="w-[453px] h-80 left-[1281px] top-[2338px] absolute flex flex-col justify-center gap-1">
        <div className="flex items-center gap-2"><span className="text-white text-base font-bold font-['Poppins'] leading-10">Monday:</span><span className="text-white text-base font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
        <div className="flex items-center gap-2"><span className="text-white text-base font-bold font-['Poppins'] leading-10">Tuesday:</span><span className="text-white text-base font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
        <div className="flex items-center gap-2"><span className="text-white text-base font-bold font-['Poppins'] leading-10">Wednesday:</span><span className="text-white text-base font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
        <div className="flex items-center gap-2"><span className="text-white text-base font-bold font-['Poppins'] leading-10">Thursday:</span><span className="text-white text-base font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
        <div className="flex items-center gap-2"><span className="text-white text-base font-bold font-['Poppins'] leading-10">Friday:</span><span className="text-white text-base font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
        <div className="flex items-center gap-2"><span className="text-white text-base font-bold font-['Poppins'] leading-10">Saturday:</span><span className="text-white text-base font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
        <div className="flex items-center gap-2"><span className="text-white text-base font-bold font-['Poppins'] leading-10">Sunday:</span><span className="text-white text-base font-normal font-['Poppins'] leading-10">8:00 AM–3:00 AM</span></div>
      </div>
      <img className="w-11 h-11 left-[1281px] top-[2257px] absolute" src="/assets/pic_47.png" alt="clock icon" />
    </>
  )
}

export default DeliveryInfoSection