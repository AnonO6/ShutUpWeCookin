"use client";

import { motion } from "framer-motion";
import { Home, Share2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ResultsTab } from "@/lib/types";
import { ChefAvatar } from "../chef-avatar";
import { StreamingText } from "../streaming-text";
import { BudgetTab } from "../results/budget-tab";
import { GroceryTab } from "../results/grocery-tab";
import { MealPlanTab } from "../results/meal-plan-tab";
import { SwapsTab } from "../results/swaps-tab";
import { GhostButton } from "../ui/button";

const TABS: { id: ResultsTab; label: string }[] = [
  { id: "meals", label: "🍽️ Meal Plan" },
  { id: "grocery", label: "🛒 Grocery" },
  { id: "swaps", label: "🔄 Swaps" },
  { id: "budget", label: "💰 Budget" },
];

export function ResultsScreen({
  onRegenerate,
  onOptimizeBudget,
  onReset,
}: {
  onRegenerate: (section?: ResultsTab) => void;
  onOptimizeBudget: () => void;
  onReset: () => void;
}) {
  const { result, activeTab, setActiveTab } = useAppStore();
  if (!result) return null;

  async function sharePlan() {
    const text = result!.meals
      .map((m) => `${m.type}: ${m.name} (${m.prepTime} + ${m.cookTime})`)
      .join("\n");
    if (navigator.share) {
      await navigator.share({
        title: "Chef-chan Meal Plan",
        text: `${result!.commentary}\n\n${text}`,
      });
    }
  }

  return (
    <div className="mx-auto min-h-dvh max-w-2xl pb-28">
      <div className="sticky top-0 z-20 bg-lavender/90 px-5 py-4 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <GhostButton onClick={onReset}>
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4" /> New Plan
            </span>
          </GhostButton>
          <GhostButton onClick={sharePlan}>
            <span className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share
            </span>
          </GhostButton>
        </div>

        <div className="chip-scroll flex gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-coral text-white shadow-md"
                  : "bg-white text-ink card-shadow"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-start gap-4 rounded-3xl bg-white p-5 card-shadow"
        >
          <ChefAvatar size="md" mood="presenting" className="shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted">Chef-chan says</p>
            <p className="mt-1 text-base italic leading-relaxed text-ink">
              <StreamingText text={result.commentary} speed={12} />
            </p>
          </div>
        </motion.div>

        {activeTab === "meals" && (
          <MealPlanTab
            meals={result.meals}
            onRegenerate={() => onRegenerate("meals")}
          />
        )}
        {activeTab === "grocery" && (
          <GroceryTab
            items={result.groceryList}
            budget={result.budget}
            onRegenerate={() => onRegenerate("grocery")}
          />
        )}
        {activeTab === "swaps" && (
          <SwapsTab
            substitutions={result.substitutions}
            onRegenerate={() => onRegenerate("swaps")}
          />
        )}
        {activeTab === "budget" && (
          <BudgetTab
            budget={result.budget}
            onOptimize={onOptimizeBudget}
            onRegenerate={() => onRegenerate("budget")}
          />
        )}
      </div>
    </div>
  );
}
