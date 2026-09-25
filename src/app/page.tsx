"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const WorkoutBody = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
        <span className="loading loading-spinner text-[#B7FF00] loading-lg"></span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white px-6 lg:px-12 py-10">

      {/* Hero / Heading */}
      <section className="mb-10">

        <p className="text-[#B7FF00] text-sm font-semibold uppercase tracking-widest mb-3">
          WORKOUT LIBRARY
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              TRAIN WITH INTENT. LOG
              EVERY SET.
            </h1>

            <p className="text-[#7D838C] mt-3 max-w-xl">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>
          </div>

          <div className="text-sm text-[#7D838C]">
            {workouts.length} workouts available
          </div>

        </div>
      </section>


      {/* Filter buttons */}
      <section className="flex flex-wrap gap-3 mb-8">

        <button className="px-5 py-2.5 rounded-lg bg-[#B7FF00] text-[#0B0D10] font-semibold text-sm">
          All
        </button>

        <button className="px-5 py-2.5 rounded-lg bg-[#12161B] border border-[#292E35] text-[#A6ABB3] hover:text-white transition text-sm">
          Beginner
        </button>

        <button className="px-5 py-2.5 rounded-lg bg-[#12161B] border border-[#292E35] text-[#A6ABB3] hover:text-white transition text-sm">
          Intermediate
        </button>

        <button className="px-5 py-2.5 rounded-lg bg-[#12161B] border border-[#292E35] text-[#A6ABB3] hover:text-white transition text-sm">
          Advanced
        </button>

      </section>


      {/* Workout Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {workouts.map((workout) => (

          <article
            key={workout.id}
            className="group bg-[#12161B] border border-[#20242A] rounded-2xl overflow-hidden hover:border-[#B7FF00]/50 transition duration-300"
          >

            {/* Image */}
            <div className="relative h-52 overflow-hidden">

              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Difficulty */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1.5 rounded-full bg-[#0B0D10]/80 backdrop-blur-sm text-xs font-medium text-[#B7FF00]">
                  {workout.difficulty}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1.5 rounded-full bg-[#0B0D10]/80 backdrop-blur-sm text-xs text-white">
                  ★ {workout.rating}
                </span>
              </div>

            </div>


            {/* Card Content */}
            <div className="p-5">

              <h2 className="text-lg font-bold text-white mb-2">
                {workout.name}
              </h2>

              {/* Muscle Groups */}
              <div className="flex flex-wrap gap-2 mb-4">

                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="text-xs text-[#8D949E] bg-[#1A1E23] px-2.5 py-1 rounded-md"
                  >
                    {muscle}
                  </span>
                ))}

              </div>


              {/* Workout Info */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-5">

                <div>
                  <p className="text-[#686F79] text-xs">
                    Duration
                  </p>

                  <p className="text-white mt-1">
                    {workout.duration} min
                  </p>
                </div>

                <div>
                  <p className="text-[#686F79] text-xs">
                    Calories
                  </p>

                  <p className="text-white mt-1">
                    {workout.caloriesBurned} kcal
                  </p>
                </div>

              </div>


              {/* Details Button */}
              <Link
                href={`/workout/${workout.id}`}
                className="w-full h-11 rounded-lg bg-[#B7FF00] text-[#0B0D10] flex items-center justify-center font-semibold text-sm hover:bg-[#A5E900] transition"
              >
                View Workout
              </Link>

            </div>

          </article>

        ))}

      </section>

    </main>
  );
};

export default WorkoutBody;