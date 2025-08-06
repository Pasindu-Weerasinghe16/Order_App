import { FaArrowRight, FaArrowLeft, FaStar, FaRegCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Kamal Perera",
      location: "Colombo 03",
      date: "24th September, 2023",
      content: "The delivery was incredibly fast despite heavy rain. My burger arrived hot and fresh, exactly as ordered. The delivery rider was very polite despite the bad weather.",
      rating: 5
    },
    {
      name: "Nimali Fernando",
      location: "Kotte",
      date: "15th October, 2023",
      content: "I appreciate how they accommodated my special request for no onions. The food quality was excellent and arrived before the estimated time. Will definitely order again!",
      rating: 4
    },
    {
      name: "Sanjeewa Rathnayake",
      location: "Battaramulla",
      date: "5th November, 2023",
      content: "The midnight delivery service saved us during a late-night work session. The food was piping hot and the packaging was very secure. Excellent service overall.",
      rating: 5
    }
  ];

  return (
    <div className="w-[1726px] h-[600px] left-[97px] top-[2847px] absolute bg-zinc-300">
      {/* Section title - perfectly aligned with left edge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="left-[99px] top-[92px] absolute text-black text-5xl font-bold font-['Poppins']"
      >
        Customer Reviews
      </motion.div>

      {/* Navigation arrows - perfectly aligned with right edge */}
      <div className="flex justify-between items-center absolute w-[13px] left-[1500px] top-[104px]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-amber-500 text-3xl p-2"
        >
          <FaArrowLeft />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-amber-500 text-3xl p-2"
        >
          <FaArrowRight />
        </motion.button>
      </div>

      {/* Reviews grid - perfectly aligned */}
      <div className="absolute left-[99px] top-[197px] flex gap-[20px]">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="w-[496px] h-[300px] bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaUserCircle className="text-4xl text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold font-['Poppins'] text-slate-950">
                  {review.name}
                </h3>
                <p className="text-amber-500 text-sm">{review.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`text-sm ${i < review.rating ? 'text-amber-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>

            <p className="text-black text-base font-normal font-['Poppins'] leading-relaxed mb-6">
              {review.content}
            </p>

            <div className="flex items-center gap-2 text-gray-500">
              <FaRegCalendarAlt />
              <span className="text-sm">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;