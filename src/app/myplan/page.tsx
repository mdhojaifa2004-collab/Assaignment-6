"use client";

import Link from "next/link";
import React, { useState } from "react";

const MyPlanPage = () => {
    const [activeTab, setActiveTab] = useState("today");
    const [sortBy, setSortBy] = useState("Duration");

    // আপাতত empty plan
    const exercises = [];

    // পরে এখানে তোমার logged-in user email বসাতে পারো
    const userEmail = "your@email.com";

    return (
        <main className="min-h-screen bg-[#02070D] text-white">

            {/* Main Container */}
            <div className="max-w-[1180px] mx-auto px-5 lg:px-8 py-10">

                {/* ================= HEADER ================= */}
                <section className="mb-9">

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        MY PLAN
                    </h1>

                    <p className="mt-2 text-white/80 text-base font-medium">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>

                </section>


                {/* ================= STATS ================= */}
                <section className="rounded-2xl overflow-hidden bg-[#16354C] border border-white/10">

                    <div className="grid grid-cols-1 md:grid-cols-3">

                        {/* Exercises */}
                        <div className="px-7 py-5 md:border-r border-white/20">

                            <p className="text-sm font-semibold text-white/90">
                                Exercises
                            </p>

                            <p className="mt-2 text-4xl font-bold text-[#B7FF00]">
                                {exercises.length}
                            </p>

                        </div>


                        {/* Minutes */}
                        <div className="px-7 py-5 md:border-r border-white/20">

                            <p className="text-sm font-semibold text-white/90">
                                Minutes
                            </p>

                            <p className="mt-2 text-4xl font-bold">
                                0
                            </p>

                        </div>


                        {/* Calories */}
                        <div className="px-7 py-5">

                            <p className="text-sm font-semibold text-white/90">
                                Calories
                            </p>

                            <p className="mt-2 text-4xl font-bold">
                                0
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= TABS + SORT ================= */}
                <section className="mt-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

                    {/* Tabs */}
                    <div className="inline-flex w-fit p-1 rounded-xl bg-[#16354C]">

                        <button
                            onClick={() => setActiveTab("today")}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition ${
                                activeTab === "today"
                                    ? "bg-[#B7FF00] text-[#07100A]"
                                    : "text-white/80 hover:text-white"
                            }`}
                        >
                            Today's Plan
                        </button>

                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition ${
                                activeTab === "saved"
                                    ? "bg-[#B7FF00] text-[#07100A]"
                                    : "text-white/80 hover:text-white"
                            }`}
                        >
                            Saved
                        </button>

                    </div>


                    {/* Sort */}
                    <div className="flex flex-col gap-2 w-full md:w-[340px]">

                        <label className="text-sm font-semibold">
                            Sort By
                        </label>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="select w-full rounded-xl bg-transparent border border-white/70 text-white outline-none"
                        >
                            <option className="bg-[#0B1118]">
                                Duration
                            </option>

                            <option className="bg-[#0B1118]">
                                Calories
                            </option>

                            <option className="bg-[#0B1118]">
                                Rating
                            </option>

                            <option className="bg-[#0B1118]">
                                Difficulty
                            </option>

                        </select>

                    </div>

                </section>


                {/* ================= EMPTY PLAN ================= */}
                <section className="mt-8">

                    {exercises.length === 0 ? (

                        <div className="relative min-h-[215px] rounded-2xl bg-[#16354C] border border-white/10 flex flex-col items-center justify-center text-center px-5">

                            {/* Email */}
                            <p className="absolute top-12 right-8 text-[#B7FF00] text-xs font-semibold">
                                {userEmail}
                            </p>


                            <h2 className="text-xl font-extrabold">
                                NOTHING HERE YET
                            </h2>


                            <p className="mt-3 text-white/90 font-medium">
                                Browse the library and add a lift to get today moving.
                            </p>


                            <Link
                                href="/workout"
                                className="mt-6 px-6 py-3 rounded-xl bg-[#B7FF00] text-[#07100A] font-bold text-sm hover:bg-[#c7ff45] transition"
                            >
                                Go to workouts
                            </Link>

                        </div>

                    ) : (

                        <div className="grid gap-4">
                            {/* এখানে পরে exercise cards আসবে */}
                        </div>

                    )}

                </section>

            </div>


            {/* ================= FOOTER ================= */}
            <footer className="mt-20 border-t border-white/10">

                <div className="max-w-[1180px] mx-auto px-5 lg:px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-4">

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[#B7FF00] font-bold"
                    >
                        <span>⚒</span>
                        <span>FITLOG</span>
                    </Link>


                    <p className="text-sm text-white/60">
                        © 2026 FITLOG — Workout Library. Train hard, log hard.
                    </p>

                </div>

            </footer>

        </main>
    );
};

export default MyPlanPage;