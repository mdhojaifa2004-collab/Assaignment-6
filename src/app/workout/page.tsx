"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function WorkoutDetailsPage() {

    const { id } = useParams();

    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchWorkout = async () => {

            try {

                const res = await fetch(
                    `https://api.abcz.workers.dev/api/fitlog/${id}`
                );

                const data = await res.json();

                setWorkout(data);

            } catch (error) {

                console.error("Failed to load workout:", error);

            } finally {

                setLoading(false);

            }

        };

        if (id) {
            fetchWorkout();
        }

    }, [id]);


    /* Loading */
    if (loading) {

        return (
            <main className="min-h-screen bg-[#0B0D10] flex items-center justify-center">

                <span className="loading loading-spinner text-[#B7FF00] loading-lg"></span>

            </main>
        );

    }


    /* If workout not found */
    if (!workout) {

        return (
            <main className="min-h-screen bg-[#0B0D10] text-white flex flex-col items-center justify-center">

                <h1 className="text-2xl font-bold">
                    Workout not found
                </h1>

                <Link
                    href="/workout"
                    className="mt-5 px-5 py-3 bg-[#B7FF00] text-black rounded-lg font-semibold"
                >
                    Back to workouts
                </Link>

            </main>
        );

    }


    return (

        <main className="min-h-screen bg-[#0B0D10] text-white">

            {/* ================= MAIN ================= */}

            <div className="max-w-[1180px] mx-auto px-5 lg:px-8 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">


                    {/* ================= IMAGE ================= */}

                    <div className="rounded-xl overflow-hidden bg-[#12161B]">

                        <img
                            src={workout.image}
                            alt={workout.name}
                            className="w-full h-[500px] object-cover"
                        />

                    </div>


                    {/* ================= DETAILS ================= */}

                    <div className="flex flex-col">

                        {/* Title */}

                        <h1 className="text-3xl md:text-4xl font-extrabold uppercase">
                            {workout.name}
                        </h1>


                        {/* Description */}

                        <p className="mt-3 text-[#8D949E] leading-relaxed">
                            {workout.description}
                        </p>


                        {/* Muscle Groups */}

                        <div className="flex flex-wrap gap-2 mt-4">

                            {workout.muscleGroups?.map((muscle) => (

                                <span
                                    key={muscle}
                                    className="px-3 py-1 rounded-full bg-[#B7FF00] text-black text-xs font-bold"
                                >
                                    {muscle}
                                </span>

                            ))}

                        </div>


                        {/* ================= INFO TABLE ================= */}

                        <div className="mt-5 rounded-xl overflow-hidden border border-[#252B32] bg-[#12161B]">

                            <div className="flex justify-between px-4 py-3 border-b border-[#252B32]">

                                <span className="text-[10px] uppercase text-[#737A84]">
                                    Equipment
                                </span>

                                <span className="text-xs">
                                    {workout.equipment}
                                </span>

                            </div>


                            <div className="flex justify-between px-4 py-3 border-b border-[#252B32]">

                                <span className="text-[10px] uppercase text-[#737A84]">
                                    Difficulty
                                </span>

                                <span className="text-xs">
                                    {workout.difficulty}
                                </span>

                            </div>


                            <div className="flex justify-between px-4 py-3 border-b border-[#252B32]">

                                <span className="text-[10px] uppercase text-[#737A84]">
                                    Sets
                                </span>

                                <span className="text-xs">
                                    {workout.sets}
                                </span>

                            </div>


                            <div className="flex justify-between px-4 py-3 border-b border-[#252B32]">

                                <span className="text-[10px] uppercase text-[#737A84]">
                                    Reps
                                </span>

                                <span className="text-xs">
                                    {workout.reps}
                                </span>

                            </div>


                            <div className="flex justify-between px-4 py-3 border-b border-[#252B32]">

                                <span className="text-[10px] uppercase text-[#737A84]">
                                    Duration
                                </span>

                                <span className="text-xs">
                                    {workout.duration} min
                                </span>

                            </div>


                            <div className="flex justify-between px-4 py-3 border-b border-[#252B32]">

                                <span className="text-[10px] uppercase text-[#737A84]">
                                    Calories
                                </span>

                                <span className="text-xs">
                                    {workout.caloriesBurned} kcal
                                </span>

                            </div>


                            <div className="flex justify-between px-4 py-3">

                                <span className="text-[10px] uppercase text-[#737A84]">
                                    Rating
                                </span>

                                <span className="text-xs">
                                    {workout.rating}
                                </span>

                            </div>

                        </div>


                        {/* ================= INSTRUCTIONS ================= */}

                        <div className="mt-5">

                            <h2 className="text-sm font-bold uppercase">
                                Instructions
                            </h2>


                            <ol className="mt-3 space-y-2">

                                {workout.instructions?.map(
                                    (instruction, index) => (

                                        <li
                                            key={index}
                                            className="text-xs text-[#9AA1AA]"
                                        >
                                            <span className="mr-2">
                                                {index + 1}.
                                            </span>

                                            {instruction}

                                        </li>

                                    )
                                )}

                            </ol>

                        </div>


                        {/* ================= BUTTONS ================= */}

                        <div className="flex gap-3 mt-6">

                            <button
                                className="px-5 py-3 rounded-lg bg-[#B7FF00] text-black text-xs font-bold hover:bg-[#c8ff4d] transition"
                            >
                                Add to today's plan
                            </button>


                            <button
                                className="px-5 py-3 rounded-lg border border-[#353B43] text-white text-xs font-medium hover:bg-[#12161B] transition"
                            >
                                ♡ Save for later
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );
}