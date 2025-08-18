import React from 'react';
import { FaCapsules, FaLungsVirus, FaHeartbeat, FaTablets, FaVial } from 'react-icons/fa';

const CategoryPromotion = () => {
  const categories = [
    { name: 'Pain Relief', icon: <FaCapsules /> },
    { name: 'Cough & Cold', icon: <FaLungsVirus /> },
    { name: 'Heart Care', icon: <FaHeartbeat /> },
    { name: 'Vitamins', icon: <FaTablets /> },
    { name: 'Diagnostics', icon: <FaVial /> },
  ];

  return (
    <div className="py-16 px-6 md:px-20  text-center">
      <h2 className="text-4xl md:text-6xl font-bold text-[#080c3b] mb-12">
        Explore by Popular Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-xl border border-[#DED3C4] shadow-md hover:shadow-xl cursor-pointer transition duration-300 ease-in-out"
          >
            <div className="text-4xl text-[#080c3b] mb-4">{category.icon}</div>
            <span className="text-md font-semibold text-[#555879]">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPromotion;
