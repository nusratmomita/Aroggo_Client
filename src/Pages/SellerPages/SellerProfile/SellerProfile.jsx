import React, { useContext } from 'react';
import { AuthContext } from '../../../Authentication/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const SellerProfile = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="min-h-[60vh] flex justify-center items-center mt-40 px-6 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#DED3C4] max-w-md w-full text-center">
        <div className="flex justify-center">
          <img
            src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-[#98A1BC] object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#080c3b] mt-6">
          {user?.displayName || 'Unknown Seller'}
        </h2>

        <p className="text-[#555879] mt-2 text-sm">{user?.email}</p>

        <div className="flex items-center justify-center mt-4">
          <FaCheckCircle className="text-green-500 mr-2" />
          <span className="text-sm text-[#080c3b] font-semibold">Verified Seller</span>
        </div>

        <div className="mt-8 flex justify-center gap-4">
            <Link to="/dashboard/manageMedicine">
                <button className="border border-[#98A1BC] text-[#080c3b] px-4 py-2 rounded-full hover:bg-[#DED3C4] transition duration-300">
                    Add New Medicines
                </button>
            </Link>
        </div>
      </div>
        </div>
    );
};

export default SellerProfile;