import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">
      {/* Left Side Image */}
      <div className="hidden md:block w-1/2 h-screen overflow-hidden fixed left-0 top-0">
        <img 
          src="/Assets/SignUp_bg.jpg" 
          alt="Background" 
          className="w-full h-full object-cover object-left"
        />
      </div>
      
      {/* Sign Up Form */}
      <motion.div 
        className="relative w-full md:w-1/2 bg-white rounded-tl-[70px] rounded-bl-[70px] overflow-hidden p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-center ml-auto"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: '100vh' }}
      >
        <div className="text-center mb-12">
          <h1 className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-bold font-['Montserrat']">
            Sign Up
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8">
          <div className="w-full max-w-lg space-y-6">
            {/* First Name Field */}
            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                First Name
              </label>
              <input 
                type="text" 
                className="w-full p-4 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                minLength="2"
              />
            </motion.div>
            
            {/* Last Name Field */}
            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                Last Name
              </label>
              <input 
                type="text" 
                className="w-full p-4 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                minLength="2"
              />
            </motion.div>
            
            {/* Email Field */}
            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                E-mail Address
              </label>
              <input 
                type="email" 
                className="w-full p-4 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            
            {/* Password Field */}
            <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
              <label className="text-zinc-600 text-base md:text-lg font-normal font-['Open_Sans']">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full p-4 pr-12 text-base md:text-lg border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5 text-neutral-400" />
                  ) : (
                    <FaEye className="w-5 h-5 text-neutral-400" />
                  )}
                </button>
              </div>
            </motion.div>
            
            {/* Create Account Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button 
                type="submit"
                className={`w-full py-4 bg-green-700 hover:bg-green-800 text-white text-lg md:text-xl font-bold rounded-lg transition-colors duration-300 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </motion.div>
            
            {/* Login Link */}
            <motion.div className="text-center pt-4" whileHover={{ scale: 1.02 }}>
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
        </form>
      </motion.div>
    </div>
  );
};

export default SignUpPage;