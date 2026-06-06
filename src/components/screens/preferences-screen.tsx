"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { BUDGET_LABELS, DIET_OPTIONS, MEAL_OPTIONS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import type { Budget, Diet, MealType } from "@/lib/types";
import { ProgressDots } from "../progress-dots";
import { SpeechBubble } from "../speech-bubble";
import { PrimaryButton } from "../ui/button";

const BUDGETS: Budget[] = ["broke", "reasonable", "treat", "dont-care"];

export function PreferencesScreen({
  onGenerate,
  onBack,
}: {
  onGenerate: () => void;
  onBack: () => void;
}) {
  const { inputs, setInputs } = useAppStore();

  function toggleDiet(diet: Diet) {
    if (diet === "none") {
      setInputs({ diets: ["none"] });
      return;
    }
    const current = inputs.diets.filter((d) => d !== "none");
    const next = current.includes(diet)
      ? current.filter((d) => d !== diet)
      : [...current, diet];
    setInputs({ diets: next.length ? next : ["none"] });
  }

  function toggleMeal(meal: MealType) {
    const next = inputs.meals.includes(meal)
      ? inputs.meals.filter((m) => m !== meal)
      : [...inputs.meals, meal];
    if (next.length) setInputs({ meals: next });
  }

  return (
    <div className="mx-auto min-h-dvh max-w-2xl px-5 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onBack} className="rounded-full bg-white p-2 card-shadow">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <ProgressDots step={2} />
        <div className="w-9" />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-3xl font-bold text-ink">Quick, answer me.</h2>

        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-white p-5 card-shadow">
            <p className="mb-3 font-display font-semibold">What&apos;s your budget today?</p>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  onClick={() => setInputs({ budget: b })}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    inputs.budget === b
                      ? "bg-coral text-white"
                      : "bg-lavender text-ink hover:bg-lilac/50"
                  }`}
                >
                  {BUDGET_LABELS[b]}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 card-shadow">
            <p className="mb-4 font-display font-semibold">How many people?</p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() =>
                  setInputs({ people: Math.max(1, inputs.people - 1) })
                }
                className="rounded-full bg-lavender p-3 transition hover:bg-lilac/50"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="font-display text-5xl font-bold text-ink">
                {inputs.people}
              </span>
              <button
                onClick={() =>
                  setInputs({ people: Math.min(8, inputs.people + 1) })
                }
                className="rounded-full bg-lavender p-3 transition hover:bg-lilac/50"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 card-shadow">
            <p className="mb-3 font-display font-semibold">Dietary</p>
            <div className="flex flex-wrap gap-2">
              {DIET_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => toggleDiet(d.id)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    inputs.diets.includes(d.id)
                      ? "bg-mint text-ink ring-2 ring-mint"
                      : "bg-lavender text-ink"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <p className="mb-3 mt-5 font-display font-semibold">Which meals?</p>
            <div className="flex flex-wrap gap-2">
              {MEAL_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => toggleMeal(m.id)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    inputs.meals.includes(m.id)
                      ? "bg-yellow-soft text-ink ring-2 ring-yellow-soft"
                      : "bg-lavender text-ink"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <SpeechBubble text="Don't lie about your budget. I can always tell." />
        </div>

        <div className="mt-8">
          <PrimaryButton
            onClick={onGenerate}
            disabled={inputs.meals.length === 0}
            size="lg"
            className="w-full"
          >
            Cook It Up 🔥
          </PrimaryButton>
        </div>
      </motion.div>
    </div>
  );
}
