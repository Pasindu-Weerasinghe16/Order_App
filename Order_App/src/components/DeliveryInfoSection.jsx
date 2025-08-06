import { FaTruck, FaPhoneAlt, FaClock, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DeliveryInfoSection = () => {
  return (
    <>
      {/* Background containers */}
      <div className="w-[1528px] h-[659px] left-[196px] top-[2135px] absolute bg-neutral-50 rounded-xl shadow-[5px_5px_14px_0px_rgba(0,0,0,0.25)]" />
      <div className="w-[496px] h-[659px] left-[1218px] top-[2135px] absolute bg-slate-950 rounded-tr-xl rounded-br-xl shadow-[5px_5px_14px_0px_rgba(0,0,0,0.25)]" />
      
      {/* Delivery Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[577px] h-[549px] left-[242px] top-[2190px] absolute flex flex-col justify-center"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="text-amber-500 text-3xl"
          >
            <FaTruck />
          </motion.div>
          <span className="text-slate-950 text-3xl font-bold font-['Poppins'] leading-[48px]">
            Delivery information
          </span>
        </div>
        
        <div className="flex flex-col gap-1">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <motion.div 
              key={day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2"
            >
              <span className="text-black text-lg font-bold font-['Poppins'] leading-10 w-28">{day}:</span>
              <span className="text-black text-lg font-normal font-['Poppins'] leading-10">
                {day === 'Monday' 
                  ? '12:00 AM–3:00 AM, 8:00 AM–3:00 AM' 
                  : day === 'Sunday'
                    ? '8:00 AM–12:00 AM'
                    : '8:00 AM–3:00 AM'}
              </span>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="mt-4 flex items-center gap-2"
        >
          <span className="text-black text-lg font-bold font-['Poppins'] leading-10">
            Estimated time until delivery:
          </span>
          <span className="text-amber-500 text-lg font-bold font-['Poppins'] leading-10">20 min</span>
        </motion.div>
      </motion.div>
      
      {/* Contact Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-96 h-72 left-[746px] top-[2250px] absolute justify-center"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="text-amber-500 text-3xl"
          >
            <FaPhoneAlt />
          </motion.div>
          <span className="text-slate-950 text-3xl font-bold font-['Poppins'] leading-[48px]">
            Contact information
          </span>
        </div>
        
        <span className="text-black text-lg font-normal font-['Poppins'] leading-10 block mb-4">
          If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.
        </span>
        
        <div className="space-y-3">
          <div>
            <span className="text-black text-lg font-bold font-['Poppins'] leading-10">
              Phone number
            </span>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2"
            >
              <FaPhoneAlt className="text-amber-500" />
              <span className="text-slate-950 text-2xl font-normal font-['Poppins'] leading-[48px]">
                +94774256972
              </span>
            </motion.div>
          </div>
          
          <div>
            <span className="text-black text-lg font-bold font-['Poppins'] leading-10">
              Website
            </span>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2"
            >
              <FaGlobe className="text-amber-500" />
              <span className="text-slate-950 text-2xl font-normal font-['Poppins'] leading-[48px]">
                http://order.lk/
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Operational Times */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[453px] h-80 left-[1281px] top-[2338px] absolute flex flex-col justify-center gap-1"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="text-amber-500 text-3xl"
          >
            <FaClock />
          </motion.div>
          <span className="text-white text-3xl font-bold font-['Poppins'] leading-[48px]">
            Operational Times
          </span>
        </div>
        
        <div className="flex flex-col gap-1">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <motion.div 
              key={day}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2"
            >
              <span className="text-white text-base font-bold font-['Poppins'] leading-10 w-28">{day}:</span>
              <span className="text-white text-base font-normal font-['Poppins'] leading-10">
                8:00 AM–3:00 AM
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default DeliveryInfoSection;