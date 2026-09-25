import Link from "next/link";
import React from "react";

const NavbarPage = () => {
    return (
        <div className="w-full h-16 bg-[#0B0D10] border-b border-[#20242A] flex items-center px-6">

            {/* LEFT - Logo */}
            <div className="flex items-center w-1/3">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >

                    <img
                        src="/src/assets/logo.png"
                        alt="FITLOG"
                        className="w-5 h-5 object-contain"
                    />

                    <span className="text-sm font-semibold text-white">
                        FITLOG
                    </span>
                </Link>
            </div>


            {/* CENTER - Navigation */}
            <div className="flex justify-center items-center w-1/3">

                <div className="flex items-center gap-3">

                    {/* Active */}
                    <Link
                        href="/workout"
                        className="px-4 py-1.5 rounded-full bg-[#24300B] text-[#B7FF00] text-[11px] font-medium"
                    >
                        Workouts
                    </Link>

                    {/* My Plan */}
                    <Link
                        href="/myplan"
                        className="px-3 py-1.5 text-[#8D949E] hover:text-white text-[11px] transition"
                    >
                        My Plan
                    </Link>

                </div>

            </div>


            {/* RIGHT */}
            <div className="flex items-center justify-end gap-5 w-1/3">

                {/* Plan */}
                <Link
                    href="/plan"
                    className="text-[#A6ABB3] hover:text-white text-[11px] transition"
                >
                    Plan
                </Link>


                {/* Notification */}
                <button className="w-5 h-5 rounded-full bg-[#B7FF00] text-[#0B0D10] flex items-center justify-center text-[9px]">
                    ●
                </button>


                {/* Saved */}
                <Link
                    href="/saved"
                    className="text-[#A6ABB3] hover:text-white text-[11px] transition"
                >
                    Saved
                </Link>


                {/* Profile */}
                <button className="w-5 h-5 rounded-full border border-[#454A52] text-[#8D949E] flex items-center justify-center text-[9px]">
                    ●
                </button>

            </div>

        </div>
    );
};

export default NavbarPage;