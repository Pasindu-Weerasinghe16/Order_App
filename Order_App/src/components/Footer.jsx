import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUtensils } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="w-[1920px] h-96 left-0 top-[3556px] absolute opacity-60 bg-zinc-300" />
      <div className="w-40 left-[1560px] top-[3637px] absolute justify-start text-slate-950 text-lg font-bold font-['Poppins'] leading-10">Important Links</div>
      <div className="w-32 left-[1280px] top-[3637px] absolute justify-start text-slate-950 text-lg font-bold font-['Poppins'] leading-10">Legal Pages</div>
      <div className="w-80 left-[696.67px] top-[3637px] absolute justify-start text-slate-950 text-lg font-bold font-['Poppins'] leading-10">Get Exclusive Deals in your Inbox</div>
      <div className="w-64 left-[730px] top-[3758px] absolute justify-start">
        <span className="text-slate-950 text-xs font-normal font-['Poppins'] leading-10">we wont spam, read our </span>
        <span className="text-slate-950 text-xs font-normal font-['Poppins'] underline leading-10">email policy</span>
      </div>
      <div className="w-[1920px] h-20 left-0 top-[3927px] absolute bg-slate-950" />
      <div className="w-[727.78px] left-[1081.11px] top-[3956px] absolute justify-start text-white text-base font-normal font-['Poppins']">
        Privacy Policy          Terms          Pricing           Do not sell or share my personal information
      </div>
      <div className="w-96 left-[128.89px] top-[3953px] absolute justify-start text-white text-base font-normal font-['Poppins']">
        Order.uk Copyright 2024, All Rights Reserved.
      </div>
      {/* Logo area with icon and brand name */}
      <div className="flex items-center gap-4 left-[128px] top-[3649px] absolute">
        <FaUtensils className="text-amber-500 text-5xl" />
        <span className="text-3xl font-extrabold font-['Poppins'] text-slate-950">Order</span>
      </div>
      
      <div className="w-96 h-44 left-[1560px] top-[3676px] absolute justify-start text-black text-base font-normal font-['Poppins'] underline leading-10">
        Get help<br />
        Add your restaurant<br />
        Sign up to deliver<br />
        Create a business account
      </div>
      
      <div className="w-96 h-52 left-[1280px] top-[3676px] absolute justify-start text-black text-base font-normal font-['Poppins'] underline leading-10">
        Terms and conditions<br />
        Privacy<br />
        Cookies<br />
        Modern Slavery Statement
      </div>
      
      {/* Modern logo background area (simplified) */}
      <div className="w-96 h-14 left-[127.78px] top-[3748px] absolute flex items-center justify-center bg-gradient-to-r from-amber-200 via-white to-amber-100 rounded-xl shadow">
        <FaUtensils className="text-amber-500 text-3xl mr-2" />
        <span className="text-xl font-bold text-slate-950">Order</span>
      </div>
      
      <div className="w-96 h-14 left-[696.67px] top-[3703px] absolute bg-zinc-300 rounded-[120px]" />
      <div className="w-48 h-14 left-[1045.56px] top-[3703px] absolute bg-amber-500 rounded-[120px]" />
      <div className="w-48 left-[730px] top-[3711px] absolute justify-start text-black/60 text-base font-normal font-['Poppins'] leading-10">
        youremail@gmail.com
      </div>
      <div className="w-28 h-6 left-[1092.22px] top-[3721px] absolute justify-start text-white text-lg font-medium font-['Poppins']">
        Subscribe
      </div>
      
      <div className="flex left-[724.44px] top-[3812px] absolute gap-[65.56px]">
        {/* Social Media Icons using react-icons */}
        <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-800 text-3xl"><FaFacebookF /></a>
        <a href="#" aria-label="Twitter" className="text-sky-500 hover:text-sky-700 text-3xl"><FaTwitter /></a>
        <a href="#" aria-label="Instagram" className="text-pink-500 hover:text-pink-700 text-3xl"><FaInstagram /></a>
        <a href="#" aria-label="LinkedIn" className="text-blue-800 hover:text-blue-900 text-3xl"><FaLinkedinIn /></a>
      </div>
    </>
  )
}

export default Footer