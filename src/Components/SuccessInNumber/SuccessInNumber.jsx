// StatsOverview.jsx
import React from 'react';
import CountUp from 'react-countup';
import { FaBuilding, FaUsers, FaPills } from 'react-icons/fa';

const SuccessInNumber = () => {
  return (
    <div className="py-16 px-6 md:px-20 text-center">
      <h2 className="text-6xl font-bold mb-15 text-center text-[#080c3b]">We’re Growing Strong!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#080c3b]">
        {/* Medicine Companies */}
        <div className="bg-[#DED3C4] p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <FaBuilding className="text-5xl mx-auto text-[#080c3b] mb-4" />
          <h3 className="text-2xl font-semibold mb-1">Medicine Companies</h3>
          <CountUp end={120} duration={3} className="text-6xl font-bold text-[#080c3b]" />
          <p className="text-xl text-[#080c3b] mt-1">Connected with us</p>
        </div>

        {/* Customers */}
        <div className="bg-[#DED3C4] p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <FaUsers className="text-6xl mx-auto text-[#080c3b] mb-4" />
          <h3 className="text-2xl font-semibold mb-1">Customers</h3>
          <CountUp end={3500} duration={3} className="text-6xl font-bold text-[#080c3b]" />
          <p className="text-xl text-[#080c3b] mt-1">Trust our platform</p>
        </div>

        {/* Medicines Sold */}
        <div className="bg-[#DED3C4] p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <FaPills className="text-6xl mx-auto text-[#080c3b] mb-4" />
          <h3 className="text-2xl font-semibold mb-1">Medicines Sold</h3>
          <CountUp end={45000} duration={3} separator="," className="text-6xl font-bold text-[#080c3b]" />
          <p className="text-xl text-[#080c3b] mt-1">Across all regions</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessInNumber;
