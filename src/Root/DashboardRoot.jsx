import React from 'react';
import {  NavLink, Outlet } from 'react-router';
import siteLogo from ".././assets/siteLogo.png";
import { FaHome, FaCapsules, FaCreditCard, FaBullhorn } from 'react-icons/fa';
// import UseRoleQuery from '../CustomHooks/UseRoleQuery';
import './DashboardRoot.css'


const DashboardRoot = () => {

    // const {role , roleLoading} = UseRoleQuery();
    // console.log(role , roleLoading)

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar for small screen*/}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                    
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-2xl min-h-full w-80 p-4 flex flex-col justify-between"> 
                {/* Sidebar content */}
                <div className='mt-10'>
                    {/* sidebar for seller */}
                    <div>
                        <li className='navLink'>
                        <NavLink to="/">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                        </li>
                        <li className='navLink'>
                        <NavLink to="/dashboard/manageMedicine">
                            <FaCapsules className="inline-block mr-2" />
                            Manage Medicines
                        </NavLink>
                        </li>
                        <li className='navLink'>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaCreditCard className="inline-block mr-2" />
                            Payment History
                        </NavLink>
                        </li>
                        <li className='navLink'>
                        <NavLink to="/dashboard/askForAd">
                            <FaBullhorn className="inline-block mr-2" />
                            Ask For Advertisement
                        </NavLink>
                        </li>
                    </div>
                </div>

                <div className='-ml-15 flex justify-center items-center gap-2'>
                    <img className="w-20 h-20" src={siteLogo} alt="logo" />
                    <h1 className='text-4xl text-[#080c3b] font-extrabold -ml-4'>Arrogo</h1>
                </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardRoot;