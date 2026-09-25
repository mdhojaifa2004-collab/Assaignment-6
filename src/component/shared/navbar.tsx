
import Link from 'next/link';
import React from 'react';

const NavbarPage = () => {

    const links = <>
        <li>
            <Link
                href="/workout"
                className="text-gray-400 hover:text-[#B7FF00] transition duration-200"
            >
                Workout
            </Link>
        </li>

        <li>
            <Link
                href="/myplan"
                className="text-gray-400 hover:text-[#B7FF00] transition duration-200"
            >
                My Plan
            </Link>
        </li>
    </>

    return (
        <div className="navbar bg-[#0B0D10] border-b border-[#20242A] shadow-none px-6 lg:px-12">

            {/* Left Side */}
            <div className="navbar-start">

                {/* Mobile Menu */}
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost text-white lg:hidden"
                    >
                        <svg
                            aria-label="Menu"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-[#12161B] text-white rounded-xl z-10 mt-3 w-52 p-2 shadow-xl border border-[#292E35]"
                    >
                        {links}
                    </ul>
                </div>

                {/* Logo */}
               {/* Logo */}
<Link
    href="/"
    className="flex items-center gap-3 ml-2"
>
    {/* এখানে নিজের Logo বসাবে */}
    <img src="/src/assets/logo.png" alt="FITLOG Logo"className="w-10 h-10 object-contain"/>

    {/* FITLOG Text */}
    <span className="text-2xl font-bold tracking-wide text-white">
        FIT<span className="text-[#B7FF00]">LOG</span>
    </span>
</Link>

            </div>


            {/* Center Navigation */}
            <div className="navbar-center hidden lg:flex">

                <ul className="menu menu-horizontal gap-2">

                    <li>
                        <Link
                            href="/workout"
                            className="px-5 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#12161B] transition"
                        >
                            Workout
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/myplan"
                            className="px-5 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#12161B] transition"
                        >
                            My Plan
                        </Link>
                    </li>

                </ul>

            </div>


            {/* Right Side */}
            <div className="navbar-end gap-3">

                <Link
                    href="/plan"
                    className="hidden sm:flex px-5 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#12161B] transition"
                >
                    Plan
                </Link>

                <Link
                    href="/saved"
                    className="hidden sm:flex px-5 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#12161B] transition"
                >
                    Saved
                </Link>

                {/* Start Button */}
                <Link
                    href="/workout"
                    className="px-5 py-3 rounded-lg bg-[#B7FF00] text-[#0B0D10] font-semibold hover:bg-[#A5E900] transition"
                >
                    Start Workout
                </Link>

            </div>

        </div>
    );
};

export default NavbarPage;

