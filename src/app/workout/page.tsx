"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get workouts from API
  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.log("Error loading workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    getWorkouts();
  }, []);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
        <span className="loading loading-spinner text-[#B7FF00] loading-lg"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white px-6 lg:px-12 py-10">

      {/* HEADER */}
      <section className="mb-10">

        <p className="text-[#B7FF00] text-sm font-semibold uppercase tracking-widest mb-3">
          WORKOUT LIBRARY
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="text-[#7D838C] mt-3 max-w-xl">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today's plan,
              and watch the week's work add up.
            </p>
          </div>

          <div className="text-sm text-[#7D838C]">
            {workouts.length} workouts available
          </div>

        </div>

      </section>


      {/* FILTER BUTTONS */}
      <section className="flex flex-wrap gap-3 mb-8">

        <button className="px-5 py-2.5 rounded-lg bg-[#B7FF00] text-[#0B0D10] font-semibold text-sm">
          All
        </button>

        <button className="px-5 py-2.5 rounded-lg bg-[#12161B] border border-[#292E35] text-[#A6ABB3]">
          Beginner
        </button>

        <button className="px-5 py-2.5 rounded-lg bg-[#12161B] border border-[#292E35] text-[#A6ABB3]">
          Intermediate
        </button>

        <button className="px-5 py-2.5 rounded-lg bg-[#12161B] border border-[#292E35] text-[#A6ABB3]">
          Advanced
        </button>

      </section>


      {/* WORKOUT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {workouts.map((workout) => (

          <article
            key={workout.id}
            className="bg-[#12161B] border border-[#20242A] rounded-2xl overflow-hidden hover:border-[#B7FF00]/50 transition"
          >

            {/* IMAGE */}
            <div className="relative h-52">

              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-full object-cover"
              />

              {/* DIFFICULTY */}
              <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-[#0B0D10]/80 text-xs text-[#B7FF00]">
                {workout.difficulty}
              </span>

              {/* RATING */}
              <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#0B0D10]/80 text-xs">
                ★ {workout.rating}
              </span>

            </div>


            {/* CARD CONTENT */}
            <div className="p-5">

              <h2 className="text-lg font-bold mb-2">
                {workout.name}
              </h2>


              {/* MUSCLE GROUPS */}
              <div className="flex flex-wrap gap-2 mb-4">

                {workout.muscleGroups.map((muscle: string) => (

                  <span
                    key={muscle}
                    className="text-xs text-[#8D949E] bg-[#1A1E23] px-2.5 py-1 rounded-md"
                  >
                    {muscle}
                  </span>

                ))}

              </div>


              {/* INFORMATION */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-5">

                <div>
                  <p className="text-[#686F79] text-xs">
                    Duration
                  </p>

                  <p className="mt-1">
                    {workout.duration} min
                  </p>
                </div>

                <div>
                  <p className="text-[#686F79] text-xs">
                    Calories
                  </p>

                  <p className="mt-1">
                    {workout.caloriesBurned} kcal
                  </p>
                </div>

              </div>


              {/* DETAILS BUTTON */}
              <Link
                href={`/workout/${workout.id}`}
                className="w-full h-11 rounded-lg bg-[#B7FF00] text-[#0B0D10] flex items-center justify-center font-semibold text-sm hover:bg-[#A5E900]"
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

export default WorkoutPage;