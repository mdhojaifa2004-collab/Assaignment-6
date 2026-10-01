"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  // Plan workouts
  const [plan, setPlan] = useState<Workout[]>([]);

  // Saved workouts
  const [saved, setSaved] = useState<Workout[]>([]);

  // Current tab
  const [activeTab, setActiveTab] = useState("plan");

  // Sorting
  const [sortBy, setSortBy] = useState("duration");

  // Completed workouts
  const [doneWorkouts, setDoneWorkouts] = useState<number[]>([]);

  // Toast message
  const [message, setMessage] = useState("");


  // LOAD DATA
  useEffect(() => {

    const savedPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const savedItems = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const doneItems = JSON.parse(
      localStorage.getItem("fitlog-done") || "[]"
    );

    setPlan(
      Array.isArray(savedPlan) ? savedPlan : []
    );

    setSaved(
      Array.isArray(savedItems) ? savedItems : []
    );

    setDoneWorkouts(
      Array.isArray(doneItems) ? doneItems : []
    );

  }, []);


  // CHECK URL
  // This allows Navbar "Saved" button to open Saved tab
  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    if (params.get("tab") === "saved") {
      setActiveTab("saved");
    }

  }, []);


  // TOAST
  const showMessage = (text: string) => {

    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2000);

  };


  // MARK AS DONE
  const markAsDone = (id: number) => {

    if (doneWorkouts.includes(id)) {
      return;
    }

    const newDoneList = [
      ...doneWorkouts,
      id
    ];

    setDoneWorkouts(newDoneList);

    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(newDoneList)
    );

    showMessage("Workout marked as done!");

  };


  // REMOVE FROM PLAN
  const removeFromPlan = (id: number) => {

    const newPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(newPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(newPlan)
    );

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );

    showMessage("Workout removed!");

  };


  // REMOVE FROM SAVED
  const removeFromSaved = (id: number) => {

    const newSaved = saved.filter(
      (workout) => workout.id !== id
    );

    setSaved(newSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(newSaved)
    );

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );

    showMessage("Workout unsaved!");

  };


  // CURRENT LIST
  let currentItems = plan;

  if (activeTab === "saved") {
    currentItems = saved;
  }


  // SORT WORKOUTS
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


  // TOTAL MINUTES
  const totalMinutes = plan.reduce(
    (total, workout) => {
      return total + workout.duration;
    },
    0
  );


  // TOTAL CALORIES
  const totalCalories = plan.reduce(
    (total, workout) => {
      return total + workout.caloriesBurned;
    },
    0
  );


  return (

    <main className="min-h-screen bg-[#0B0D10] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">


        {/* TOAST */}

        {message && (

          <div className="fixed top-20 right-5 z-50 bg-[#B7FF00] text-[#0B0D10] px-5 py-3 rounded-lg shadow-lg text-sm font-semibold">
            ✓ {message}
          </div>

        )}


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

        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#20242A] mb-8 gap-4">

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


          {/* SORT */}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#12161B] border border-[#30353D] text-white text-xs rounded-lg px-4 py-2 mb-2"
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

          /* WORKOUT CARDS */

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

                    <div className="flex justify-between gap-3">

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


                    {/* INFO */}

                    <div className="flex gap-4 mt-4 text-xs text-[#8D949E]">

                      <span>
                        {workout.duration} min
                      </span>

                      <span>
                        {workout.caloriesBurned} kcal
                      </span>

                    </div>


                    {/* BUTTONS */}

                    <div className="flex gap-2 mt-4 flex-wrap">


                      {/* VIEW */}

                      <Link
                        href={`/workout/${workout.id}`}
                        className="px-3 py-1.5 bg-[#20252B] rounded text-xs text-white"
                      >
                        View
                      </Link>


                      {/* PLAN BUTTONS */}

                      {activeTab === "plan" && (

                        <>

                          {/* MARK DONE */}

                          <button
                            onClick={() =>
                              markAsDone(workout.id)
                            }
                            disabled={doneWorkouts.includes(workout.id)}
                            className={`px-3 py-1.5 rounded text-xs ${
                              doneWorkouts.includes(workout.id)
                                ? "bg-[#24300B] text-[#B7FF00]"
                                : "bg-[#B7FF00] text-[#0B0D10]"
                            }`}
                          >

                            ✓{" "}

                            {doneWorkouts.includes(workout.id)
                              ? "Done"
                              : "Mark as Done"}

                          </button>


                          {/* REMOVE */}

                          <button
                            onClick={() =>
                              removeFromPlan(workout.id)
                            }
                            className="w-8 h-8 rounded bg-red-500/10 text-red-400"
                            title="Remove"
                          >
                            ×
                          </button>

                        </>

                      )}


                      {/* SAVED BUTTON */}

                      {activeTab === "saved" && (

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