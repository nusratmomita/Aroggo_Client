import React from 'react';
import Marquee from 'react-fast-marquee';


const TopSellingProducts = () => {

    const medicines = [
            "Asonic","BurnoHeal","Coughy","Mixy","PainGone"
    ];

    return (
        <div className="py-16 px-6 md:px-20 text-center">
              <h2 className="text-6xl font-bold mb-15 text-center text-[#080c3b]">Top Selling Medicines</h2>
        
              <div className="">
                <Marquee pauseOnHover speed={50} gradient={false}>
                    {medicines.map((med, index) => (
                    <div
                        key={index}
                        className="mx-6 flex items-center justify-center"
                    >
                        <span className="text-lg md:text-xl font-medium text-[#080c3b] bg-white px-6 py-3 rounded-full border border-[#DED3C4] shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                        {med}
                        </span>
                    </div>
                    ))}
                </Marquee>
              </div>
        </div>
    );
};

export default TopSellingProducts;