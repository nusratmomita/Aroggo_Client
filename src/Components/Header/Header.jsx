import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import './Header.css';
import siteLogo from '../../assets/siteLogo.png';
import { BsFillCartCheckFill } from "react-icons/bs";
import { AuthContext } from '../../Authentication/AuthContext';
import { toast } from 'react-toastify';
import UseRoleQuery from '../../CustomHooks/UseRoleQuery';



const Header = () => {
    const {user,handleLogout} = useContext(AuthContext);
    // console.log(user)

    const{role} = UseRoleQuery();
    // console.log(role)

    const [showDropdown, setShowDropdown] = useState(false);


    const links = 
    <>
        <li className="navLinks mt-2"><NavLink to='/'>Home</NavLink></li>
        <li className="navLinks mt-2"><NavLink to='/shop'>Shop</NavLink></li>
        <li className="navLinks mt-2"><NavLink to='/myCart'> My Cart<BsFillCartCheckFill size={30} className='ml-1'></BsFillCartCheckFill> </NavLink></li>
    </>


    const handleSignOut = () => {
        handleLogout()
        .then(()=>{
            toast.success("You've logged out successfully" );
        })
        .catch(()=>{
        })
    }


    return (
        <div className="navbar bg-gradient-to-l from-[#555879] to-[#98A1BC] shadow-sm fixed top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden w-15 h-15 hover:bg-gray-100 hover:rounded-4xl mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-25 w-25" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="navLinks menu menu-xl dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow text-2xl">
                    {
                        links
                    }
                </ul>
                </div>
                <Link to='/'>
                    <div className='flex justify-center items-center gap-2'>
                        <img className="hidden lg:block w-20 h-20" src={siteLogo} alt="logo" />
                        <h1 className='text-2xl lg:text-4xl text-[#080c3b] font-extrabold -ml-4'>Arrogo</h1>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="navLinks menu menu-horizontal px-1 text-[#F4EBD3] font-bold text-2xl">
                {
                    links
                }
                </ul>
            </div>
           <div className="mr-5 navbar-end">
                <div className='flex gap-2 lg:gap-4 justify-center items-center text-[#080c3b] font-bold'>                      
                    <div className='flex gap-2 lg:gap-4 justify-center items-center'>
                    <div className="relative">
                        {user && user?.email ? (
                            <>
                            <div
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <img
                                className="w-10 h-10 bg-white p-1 rounded-full"
                                src={user?.photoURL || "data:image/jpeg;base64,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"}
                                alt="userPhoto"
                                />
                                <h1 className="text-[#F4EBD3] text-2xl font-bold">
                                Hi, {user?.displayName || role}
                                </h1>
                            </div>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50">
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                    handleSignOut();
                                    setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                                </div>
                            )}
                            </>
                        ) : (
                            <div className='flex gap-2 lg:gap-3'>
                            <Link to="/register">
                                <button className="whitespace-nowrap lg:ml-3 p-2 lg:p-3 flex gap-2 bg-[#98A1BC] rounded-2xl justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-[#c2cce8] text-xl">
                                Join us
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="lg:ml-3 p-2 lg:p-3 flex gap-2 bg-[#98A1BC] rounded-2xl justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-[#c2cce8] text-xl">
                                Login
                                </button>
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
         </div>
        </div>
    );
};

export default Header;