import React from 'react';
import Marquee from 'react-fast-marquee';
import image1 from '../.././assets/medicineCompany1.png';
import image2 from '../.././assets/medicineCompany2.png';
import image3 from '../.././assets/medicineCompany3.png';
import image4 from '../.././assets/medicineCompany4.png';
import image5 from '../.././assets/medicineCompany5.png';
import image6 from '../.././assets/medicineCompany6.png';
import image7 from '../.././assets/medicineCompany7.png';
// import image1 from '../.././assets/medicineCompany1.png';

const SharedCompanies = () => {

    const companyLogos = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
    ];
    return (
        <div className="py-16 px-6 md:px-20 text-center">
              <h2 className="text-6xl font-bold mb-15 text-center text-[#080c3b]">Companies That Trust Us</h2>
        
              <div className="">
                <Marquee pauseOnHover speed={60} gradient={false}>
                    {companyLogos.map((logo, index) => (
                    <div key={index} className="mx-10">
                        <img
                        src={logo}
                        alt={`Company ${index + 1}`}
                        className="h-20 md:h-24 object-contain transition duration-300 ease-in-out drop-shadow-md bg-white px-4 py-2 rounded-xl border border-[#DED3C4]"
                        />
                    </div>
                    ))}
                </Marquee>
              </div>
            </div>
    );
};

export default SharedCompanies;