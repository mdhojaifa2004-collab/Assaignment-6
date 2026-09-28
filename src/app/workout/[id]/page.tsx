"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const [isInPlan, setIsInPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // GET WORKOUT
  useEffect(() => {
    const getWorkout = async () => {
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getWorkout();
    }
  }, [id]);

  // CHECK PLAN + SAVED
  useEffect(() => {
    if (!workout) return;

    try {
      const plan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const saved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setIsInPlan(
        plan.some((item: Workout) => item.id === workout.id)
      );

      setIsSaved(
        saved.some((item: Workout) => item.id === workout.id)
      );
    } catch {
      setIsInPlan(false);
      setIsSaved(false);
    }
  }, [workout]);

  // UPDATE NAVBAR
  const updateEverything = () => {
    window.dispatchEvent(new Event("fitlog-storage-update"));
  };

  // ADD / REMOVE PLAN
  const handlePlan = () => {
    if (!workout) return;

    try {
      const plan: Workout[] = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      // REMOVE
      if (isInPlan) {
        const newPlan = plan.filter(
          (item) => item.id !== workout.id
        );

        localStorage.setItem(
          "fitlog-plan",
          JSON.stringify(newPlan)
        );

        setIsInPlan(false);
        updateEverything();

        return;
      }

      // MAX 5
      if (plan.length >= 5) {
        alert("You can add maximum 5 workouts to today's plan.");
        return;
      }

      // ADD
      const newPlan = [...plan, workout];

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(newPlan)
      );

      setIsInPlan(true);
      updateEverything();

    } catch (error) {
      console.log(error);
    }
  };

  // SAVE / UNSAVE
  const handleSave = () => {
    if (!workout) return;

    try {
      const saved: Workout[] = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      // UNSAVE
      if (isSaved) {
        const newSaved = saved.filter(
          (item) => item.id !== workout.id
        );

        localStorage.setItem(
          "fitlog-saved",
          JSON.stringify(newSaved)
        );

        setIsSaved(false);
        updateEverything();

        return;
      }

      // SAVE
      const newSaved = [...saved, workout];

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(newSaved)
      );

      setIsSaved(true);
      updateEverything();

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
        <p className="text-[#B7FF00]">
          Loading...
        </p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0B0D10] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          Workout not found
        </h1>

        <Link
          href="/workout"
          className="text-[#B7FF00]"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

      ==================================  {/* BACK */}
        <Link
          href="/workout"
          className="text-[#8D949E] hover:text-white text-sm"
        >
          ← Back to workouts
        </Link>

      =========================  {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">

          {/* IMAGE */}
          <div>
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          {/* DETAILS */}
          <div>

            <p className="text-[#B7FF00] text-xs uppercase tracking-widest mb-3">
              {workout.difficulty}
            </p>

            <h1 className="text-4xl font-bold uppercase mb-4">
              {workout.name}
            </h1>

            <p className="text-[#8D949E] leading-7 mb-6">
              {workout.description}
            </p>

            {/* MUSCLES */}
            <div className="flex flex-wrap gap-2 mb-8">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="px-3 py-1 rounded-full bg-[#171B20] border border-[#292E35] text-[#B7FF00] text-xs"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* INFO */}
            <div className="border border-[#20242A] rounded-xl overflow-hidden mb-8">

              <div className="grid grid-cols-2 border-b border-[#20242A]">
                <div className="p-4 text-[#8D949E]">
                  Equipment
                </div>

                <div className="p-4 text-white">
                  {workout.equipment}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-[#20242A]">
                <div className="p-4 text-[#8D949E]">
                  Difficulty
                </div>

                <div className="p-4 text-white">
                  {workout.difficulty}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-[#20242A]">
                <div className="p-4 text-[#8D949E]">
                  Sets
                </div>

                <div className="p-4 text-white">
                  {workout.sets}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-[#20242A]">
                <div className="p-4 text-[#8D949E]">
                  Reps
                </div>

                <div className="p-4 text-white">
                  {workout.reps}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-[#20242A]">
                <div className="p-4 text-[#8D949E]">
                  Duration
                </div>

                <div className="p-4 text-white">
                  {workout.duration} min
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-[#20242A]">
                <div className="p-4 text-[#8D949E]">
                  Calories
                </div>

                <div className="p-4 text-white">
                  {workout.caloriesBurned} kcal
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="p-4 text-[#8D949E]">
                  Rating
                </div>

                <div className="p-4 text-[#B7FF00]">
                  ★ {workout.rating}
                </div>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                onClick={handlePlan}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  isInPlan
                    ? "bg-[#B7FF00] text-[#0B0D10]"
                    : "bg-[#B7FF00] text-[#0B0D10] hover:bg-[#c8ff45]"
                }`}
              >
                {isInPlan
                  ? "✓ Remove from plan"
                  : "Add to today's plan"}
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-lg border border-[#30353D] text-white hover:bg-[#171B20]"
              >
                {isSaved
                  ? "Saved"
                  : "Save for later"}
              </button>

            </div>

          </div>
        </div>

       ===================================== {/* INSTRUCTIONS */}
        <div className="mt-14 max-w-4xl">

          <h2 className="text-2xl font-bold mb-6">
            INSTRUCTIONS
          </h2>

          <div className="space-y-4">
            {workout.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-[#12161B] border border-[#20242A] rounded-xl"
              >
                <span className="text-[#B7FF00] font-bold">
                  {index + 1}
                </span>

                <p className="text-[#A6ABB3]">
                  {instruction}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </main>
  );
}