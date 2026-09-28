"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarPage() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    try {
      const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
      const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

      setPlanCount(Array.isArray(plan) ? plan.length : 0);
      setSavedCount(Array.isArray(saved) ? saved.length : 0);
    } catch {
      setPlanCount(0);
      setSavedCount(0);
    }
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener("fitlog-storage-update", updateCounts);

    return () => {
      window.removeEventListener("fitlog-storage-update", updateCounts);
    };
  }, []);

  return (
    <nav className="w-full h-16 bg-[#0B0D10] border-b border-[#20242A] flex items-center px-6">

      {/* LEFT - LOGO */}
      <div className="flex items-center w-1/3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FITLOG"
            className="w-5 h-5 object-contain"
          />

          <span className="text-sm font-semibold text-white">
            FITLOG
          </span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="flex justify-center items-center w-1/3">
        <div className="flex items-center gap-3">

          <Link
            href="/workout"
            className="px-4 py-1.5 rounded-full bg-[#24300B] text-[#B7FF00] text-[11px] font-medium"
          >
            Workouts
          </Link>

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

        {/* PLAN */}
        <Link
          href="/myplan"
          className="flex items-center gap-1.5 text-[#A6ABB3] hover:text-white text-[11px] transition"
        >
          <span>Plan</span>

          <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#B7FF00] text-[#0B0D10] flex items-center justify-center text-[9px] font-bold">
            {planCount}
          </span>
        </Link>

        {/* GREEN DOT */}
        <div className="w-5 h-5 rounded-full bg-[#B7FF00] flex items-center justify-center">
          <span className="text-[#0B0D10] text-[8px]">●</span>
        </div>

        {/* SAVED */}
        <Link
          href="/myplan?tab=saved"
          className="flex items-center gap-1.5 text-[#A6ABB3] hover:text-white text-[11px] transition"
        >
          <span>Saved</span>

          <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#B7FF00] text-[#0B0D10] flex items-center justify-center text-[9px] font-bold">
            {savedCount}
          </span>
        </Link>

        {/* PROFILE */}
        <button
          type="button"
          className="w-7 h-7 rounded-full border border-[#30353D] bg-[#171B20] text-[#8D949E] flex items-center justify-center text-[10px]"
        >
          ●
        </button>

      </div>
    </nav>
  );
}