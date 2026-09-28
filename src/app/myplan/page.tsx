"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

export default function MyPlanPage() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const [sortBy, setSortBy] = useState("duration");

  // LOAD DATA
  const loadData = () => {
    try {
      const planData = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const savedData = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlan(Array.isArray(planData) ? planData : []);
      setSaved(Array.isArray(savedData) ? savedData : []);
    } catch {
      setPlan([]);
      setSaved([]);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    loadData();

    window.addEventListener(
      "fitlog-storage-update",
      loadData
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage-update",
        loadData
      );
    };
  }, []);

  // OPEN SAVED TAB FROM NAVBAR
  useEffect(() => {
    if (searchParams.get("tab") === "saved") {
      setActiveTab("saved");
    }
  }, [searchParams]);

  // REMOVE FROM PLAN
  const removeFromPlan = (id: number) => {
    const newPlan = plan.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(newPlan)
    );

    setPlan(newPlan);

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );
  };

  // REMOVE FROM SAVED
  const removeFromSaved = (id: number) => {
    const newSaved = saved.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(newSaved)
    );

    setSaved(newSaved);

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );
  };

  // SORT
  const currentItems =
    activeTab === "plan" ? plan : saved;

  const sortedItems = [...currentItems].sort(
    (a, b) => {

      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    }
  );

  // PLAN TOTALS
  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            MY PLAN
          </h1>

          <p className="text-[#8D949E] mt-2">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-10">

          <div className="bg-[#12161B] border border-[#20242A] rounded-xl p-5">
            <p className="text-[#8D949E] text-xs uppercase">
              Exercises
            </p>

            <p className="text-3xl font-bold mt-2">
              {plan.length}
            </p>
          </div>

          <div className="bg-[#12161B] border border-[#20242A] rounded-xl p-5">
            <p className="text-[#8D949E] text-xs uppercase">
              Minutes
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalMinutes}
            </p>
          </div>

          <div className="bg-[#12161B] border border-[#20242A] rounded-xl p-5">
            <p className="text-[#8D949E] text-xs uppercase">
              Calories
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* TABS + SORT */}
        <div className="flex items-center justify-between border-b border-[#20242A] mb-8">

          <div className="flex gap-6">

            <button
              onClick={() => setActiveTab("plan")}
              className={`pb-3 text-sm ${
                activeTab === "plan"
                  ? "text-[#B7FF00] border-b-2 border-[#B7FF00]"
                  : "text-[#8D949E]"
              }`}
            >
              Today's Plan ({plan.length})
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-3 text-sm ${
                activeTab === "saved"
                  ? "text-[#B7FF00] border-b-2 border-[#B7FF00]"
                  : "text-[#8D949E]"
              }`}
            >
              Saved ({saved.length})
            </button>

          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#12161B] border border-[#30353D] text-white text-xs rounded-lg px-3 py-2 mb-2 outline-none"
          >
            <option value="duration">
              Sort by Duration
            </option>

            <option value="calories">
              Sort by Calories
            </option>

            <option value="rating">
              Sort by Rating
            </option>
          </select>

        </div>

        {/* EMPTY */}
        {sortedItems.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-bold mb-3">
              {activeTab === "plan"
                ? "NOTHING HERE YET"
                : "NO SAVED WORKOUTS"}
            </h2>

            <p className="text-[#8D949E] mb-6">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save workouts from the library to find them here."}
            </p>

            <Link
              href="/workout"
              className="inline-block px-5 py-3 bg-[#B7FF00] text-[#0B0D10] rounded-lg font-semibold text-sm"
            >
              Go to workouts
            </Link>

          </div>

        ) : (

          /* WORKOUT LIST */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {sortedItems.map((workout) => (

              <div
                key={workout.id}
                className="bg-[#12161B] border border-[#20242A] rounded-xl overflow-hidden"
              >

                <div className="flex">

                  {/* IMAGE */}
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-36 h-36 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-4 flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h3 className="font-bold text-lg">
                          {workout.name}
                        </h3>

                        <p className="text-[#8D949E] text-xs mt-1">
                          {workout.difficulty}
                        </p>

                      </div>

                      <span className="text-[#B7FF00] text-xs">
                        ★ {workout.rating}
                      </span>

                    </div>

                    <div className="flex gap-4 mt-4 text-xs text-[#8D949E]">

                      <span>
                        {workout.duration} min
                      </span>

                      <span>
                        {workout.caloriesBurned} kcal
                      </span>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-2 mt-4">

                      <Link
                        href={`/workout/${workout.id}`}
                        className="px-3 py-1.5 bg-[#20252B] rounded text-xs text-white"
                      >
                        View
                      </Link>

                      {activeTab === "plan" ? (

                        <button
                          onClick={() =>
                            removeFromPlan(workout.id)
                          }
                          className="px-3 py-1.5 rounded text-xs bg-red-500/10 text-red-400"
                        >
                          Remove
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            removeFromSaved(workout.id)
                          }
                          className="px-3 py-1.5 rounded text-xs bg-red-500/10 text-red-400"
                        >
                          Unsave
                        </button>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}