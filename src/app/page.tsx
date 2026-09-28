"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await res.json();
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
      <main className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
        <span className="loading loading-spinner text-[#B7FF00] loading-lg"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white px-6 lg:px-12 py-10">

      {/* HERO SECTION */}
<section className="mb-10">

  <div className="relative overflow-hidden rounded-xl bg-[#12161B] border border-[#20242A] min-h-[400px]">

    <div className="grid grid-cols-1 lg:grid-cols-2 items-center h-full">

      {/* LEFT SIDE */}
      <div className="relative z-10 px-6 lg:px-10 py-8">

        <p className="text-[#B7FF00] text-[8px] font-bold uppercase tracking-widest mb-3">
          WORKOUT LIBRARY
        </p>

        <h1 className="text-3xl lg:text-4xl font-bold leading-[1.05] text-white">
          TRAIN WITH INTENT. LOG
          <br />
          EVERY SET.
        </h1>

        <p className="text-[#7D838C] text-[9px] leading-4 mt-4 max-w-[360px]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today's plan, and watch the week's work add up.
        </p>

        <Link
          href="/workout"
          className="inline-flex items-center justify-center mt-5 px-5 py-2 bg-[#B7FF00] text-[#0B0D10] rounded-sm text-[9px] font-bold hover:bg-[#A5E900] transition"
        >
          BROWSE WORKOUTS
        </Link>

      </div>

      {/* RIGHT SIDE - BANNER */}
      <div className="relative h-[460px] flex items-center justify-end">
  <img
    src="/banner.png"
    alt="FitLog workout"
    className="h-[340px] w-[350px] object-contain"
  />
</div>

    </div>

  </div>

</section>

      {/* FILTERS */}
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

      {/* WORKOUT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {workouts.map((workout) => (

          <article
            key={workout.id}
            className="group bg-[#12161B] border border-[#20242A] rounded-2xl overflow-hidden hover:border-[#B7FF00]/50 transition duration-300"
          >

            {/* IMAGE */}
            <div className="relative h-52 overflow-hidden">

              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute top-3 left-3">

                <span className="px-3 py-1.5 rounded-full bg-[#0B0D10]/80 backdrop-blur-sm text-xs font-medium text-[#B7FF00]">
                  {workout.difficulty}
                </span>

              </div>

              <div className="absolute top-3 right-3">

                <span className="px-3 py-1.5 rounded-full bg-[#0B0D10]/80 backdrop-blur-sm text-xs text-white">
                  ★ {workout.rating}
                </span>

              </div>

            </div>

            {/* CARD CONTENT */}
            <div className="p-5">

              <h2 className="text-lg font-bold text-white mb-2">
                {workout.name}
              </h2>

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
}