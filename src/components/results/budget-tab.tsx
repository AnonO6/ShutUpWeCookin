"use client";

import { RefreshCw } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { BudgetBreakdown } from "@/lib/types";
import { GhostButton, PrimaryButton } from "../ui/button";

const statusMeta = {
  under: { emoji: "✅", label: "Under Budget", color: "text-green-600" },
  over: { emoji: "⚠️", label: "Over Budget", color: "text-yellow-600" },
  "way-over": { emoji: "🔥", label: "Way Over", color: "text-coral" },
};

export function BudgetTab({
  budget,
  onOptimize,
  onRegenerate,
}: {
  budget: BudgetBreakdown;
  onOptimize: () => void;
  onRegenerate: () => void;
}) {
  const status = statusMeta[budget.status];

  return (
    <div className="space-y-5">
      <div className="flex justify-end gap-2">
        <GhostButton onClick={onRegenerate}>
          <span className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Regenerate
          </span>
        </GhostButton>
      </div>

      <div className="rounded-3xl bg-white p-5 card-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Your Budget</p>
            <p className="font-display text-2xl font-bold">
              ${budget.budgetLimit === 999 ? "∞" : budget.budgetLimit}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">Estimated</p>
            <p className="font-display text-2xl font-bold text-coral">
              ${budget.total.toFixed(2)}
            </p>
          </div>
        </div>
        <p className={`mt-4 text-lg font-semibold ${status.color}`}>
          {status.emoji} {status.label}
        </p>
        <p className="mt-2 italic text-ink/70">&ldquo;{budget.chefVerdict}&rdquo;</p>
      </div>

      <div className="rounded-3xl bg-white p-5 card-shadow">
        <h3 className="mb-4 font-display font-bold">Spend by Category</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budget.byCategory}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                {budget.byCategory.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {budget.byCategory.map((c) => (
            <div key={c.category} className="flex items-center gap-1.5 text-sm">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              {c.category} (${c.amount.toFixed(2)})
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 card-shadow">
        <h3 className="mb-3 font-display font-bold">Cost per Meal</h3>
        <div className="space-y-2">
          {budget.perMeal.map((m) => (
            <div
              key={m.meal}
              className="flex items-center justify-between rounded-2xl bg-lavender/50 px-4 py-2.5"
            >
              <span className="text-sm font-medium">{m.meal}</span>
              <span className="font-semibold text-coral">${m.cost.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <PrimaryButton onClick={onOptimize} className="w-full">
        Optimize for Budget
      </PrimaryButton>
    </div>
  );
}
