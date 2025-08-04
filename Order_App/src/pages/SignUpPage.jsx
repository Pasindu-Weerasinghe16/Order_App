import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div className="min-h-screen w-full relative bg-slate-800 overflow-hidden flex justify-end">
      {/* Background image behind the form container */}
      <img 
        src="/Assets/SignUp_bg.jpg" 
        alt="Background" 
        className="absolute left-0 top-0 h-full w-full/4 object-cover opacity-100 z-0 pointer-events-none select-none" 
        style={{ objectPosition: 'left' }}
      />
      {/* Sign Up Form Container */}
      <motion.div 
        className="relative w-full max-w-4xl bg-white rounded-tl-[70px] rounded-bl-[70px] overflow-hidden p-8 md:p-12 lg:p-16 z-10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <motion.div 
          className="absolute top-8 left-8 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft className="text-gray-800 text-2xl" />
        </motion.div>
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-bold font-['Montserrat']">
            Sign Up
          </h1>
        </div>
        
        {/* Form */}
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-lg space-y-6">
            {/* First Name Field */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
            >
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                First Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-4 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your first name"
                />
              </div>
            </motion.div>
            
            {/* Last Name Field */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
            >
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                Last Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-4 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your last name"
                />
              </div>
            </motion.div>
            
            {/* Email Field */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
            >
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                E-mail Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  className="w-full p-4 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your e-mail"
                />
              </div>
            </motion.div>
            
            {/* Password Field */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
            >
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full p-4 pr-12 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter password"
                />
                <motion.div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEye className="w-5 h-5 text-neutral-400" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Create Account Button */}
            <motion.div 
              className="pt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="w-full py-4 bg-green-700 hover:bg-green-800 text-white text-lg md:text-xl font-bold rounded-lg transition-colors duration-300">
                Create Account
              </button>
            </motion.div>
            
            {/* Login Link */}
            <motion.div 
              className="text-center pt-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center items-center gap-1">
                <span className="text-zinc-600 text-base md:text-lg font-normal">
                  Already have an account?
                </span>
                <Link to="/login">
                  <motion.span 
                    className="text-gray-800 font-medium underline px-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Log In
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage