import React from 'react';
import { Link, Links, NavLink } from 'react-router';
import './Header.css'
import siteLogo from '../../assets/siteLogo.png';
import { BsFillCartCheckFill } from "react-icons/bs";

const Header = () => {
    const links = 
    <>
        <li className="navLinks mt-2"><NavLink to='/'>Home</NavLink></li>
        <li className="navLinks mt-2"><NavLink to='/coverage'>Shop</NavLink></li>
        <BsFillCartCheckFill size={30} className='mt-5 ml-2'></BsFillCartCheckFill>
    </>

    return (
        <div className="navbar bg-gradient-to-l from-[#555879] to-[#98A1BC] shadow-sm">
            <div className="navbar-start p-5">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden w-15 h-15 hover:bg-gray-100 hover:rounded-4xl mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="navLinks menu menu-sm dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow text-5xl">
                    {
                        links
                    }
                </ul>
                </div>
                <Link to='/'>
                    <div className='flex justify-center items-center gap-2'>
                        <img className="w-20 h-20" src={siteLogo} alt="logo" />
                        <h1 className='text-4xl text-[#080c3b] font-extrabold -ml-4'>Arrogo</h1>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="navLinks menu menu-horizontal px-1 text-[#080c3b] font-bold text-3xl">
                {
                    links
                }
                </ul>
            </div>
           <div className="mr-5 navbar-end">
                <div className='flex gap-2 lg:gap-4 justify-center items-center text-[#080c3b] font-bold'>
                    <button className="ml-6 lg:ml-3 p-3 flex gap-2 bg-[#98A1BC] rounded-2xl justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-[#c2cce8] text-2xl" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
                        Select Languages
                    </button>

                    <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                    popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */ }>
                    <li><a>Bangla</a></li>
                    <li><a>English</a></li>
                    </ul>
                    <button className="ml-6 lg:ml-3 p-3 flex gap-2 bg-[#98A1BC] rounded-2xl justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-[#c2cce8] text-2xl">Join us</button>
                    <button className="ml-6 lg:ml-3 p-3 flex gap-2 bg-[#98A1BC] rounded-2xl justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-[#c2cce8] text-2xl">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Header;