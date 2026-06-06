"use client";

import { ChevronDown, RefreshCw } from "lucide-react";
import { useState } from "react";
import type { MealPlanItem } from "@/lib/types";
import { GhostButton } from "../ui/button";

const difficultyColor = {
  Easy: "bg-mint",
  Medium: "bg-yellow-soft",
  Hard: "bg-[#FFB4C8]",
};

export function MealPlanTab({
  meals,
  onRegenerate,
}: {
  meals: MealPlanItem[];
  onRegenerate: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <GhostButton onClick={onRegenerate}>
          <span className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Regenerate
          </span>
        </GhostButton>
      </div>

      {meals.map((meal) => (
        <div key={meal.type} className="relative pt-10">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-xl">
              {meal.emoji}
            </div>
          </div>
          <div className="rounded-3xl bg-white px-5 pb-5 pt-14 card-shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {meal.type}
                </p>
                <h3 className="font-display text-xl font-bold text-ink">
                  {meal.name}
                </h3>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor[meal.difficulty]}`}
              >
                {meal.difficulty}
              </span>
            </div>

            <p className="mt-2 text-sm text-muted">
              {meal.prepTime} prep · {meal.cookTime} cook
            </p>
            <p className="mt-3 italic text-ink/80">{meal.description}</p>
            <span className="mt-3 inline-block rounded-full bg-lilac/40 px-3 py-1 text-xs font-medium">
              {meal.vibeTag}
            </span>

            <button
              onClick={() =>
                setExpanded(expanded === meal.type ? null : meal.type)
              }
              className="mt-4 flex w-full items-center justify-between rounded-2xl bg-lavender/60 px-4 py-3 text-sm font-medium"
            >
              Step-by-step instructions
              <ChevronDown
                className={`h-4 w-4 transition ${expanded === meal.type ? "rotate-180" : ""}`}
              />
            </button>

            {expanded === meal.type && (
              <ol className="mt-3 space-y-2 pl-5">
                {meal.instructions.map((step, i) => (
                  <li key={i} className="text-sm text-ink/80">
                    <span className="font-semibold text-coral">{i + 1}.</span>{" "}
                    {step}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
