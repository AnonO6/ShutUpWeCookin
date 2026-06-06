"use client";

import { Check, Copy, RefreshCw, Share2 } from "lucide-react";
import { CATEGORY_META } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import type { BudgetBreakdown, GroceryItem } from "@/lib/types";
import { GhostButton } from "../ui/button";

export function GroceryTab({
  items,
  budget,
  onRegenerate,
}: {
  items: GroceryItem[];
  budget: BudgetBreakdown;
  onRegenerate: () => void;
}) {
  const { checkedGroceries, toggleGrocery } = useAppStore();

  const grouped = Object.keys(CATEGORY_META).map((cat) => ({
    category: cat as keyof typeof CATEGORY_META,
    items: items.filter((i) => i.category === cat),
  }));

  const listText = items
    .map((i) => `- ${i.name} (${i.quantity}) ~$${i.price.toFixed(2)}`)
    .join("\n");

  async function copyList() {
    await navigator.clipboard.writeText(
      `Chef-chan Grocery List\n\n${listText}\n\nTotal: $${budget.total.toFixed(2)}`,
    );
  }

  async function shareList() {
    if (navigator.share) {
      await navigator.share({
        title: "Chef-chan Grocery List",
        text: `${listText}\n\nTotal: $${budget.total.toFixed(2)}`,
      });
    } else {
      copyList();
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end gap-2">
        <GhostButton onClick={copyList}>
          <span className="flex items-center gap-2">
            <Copy className="h-4 w-4" /> Copy
          </span>
        </GhostButton>
        <GhostButton onClick={shareList}>
          <span className="flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Share
          </span>
        </GhostButton>
        <GhostButton onClick={onRegenerate}>
          <span className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Regenerate
          </span>
        </GhostButton>
      </div>

      {grouped.map(
        ({ category, items: catItems }) =>
          catItems.length > 0 && (
            <div key={category} className="rounded-3xl bg-white p-5 card-shadow">
              <h3 className="mb-3 font-display font-bold">
                {CATEGORY_META[category].emoji} {CATEGORY_META[category].label}
              </h3>
              <div className="space-y-2">
                {catItems.map((item) => {
                  const key = `${category}-${item.name}`;
                  const checked = checkedGroceries.includes(key);
                  return (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 transition ${
                        checked ? "bg-mint/30 line-through opacity-60" : "bg-lavender/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleGrocery(key)}
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                          checked
                            ? "border-coral bg-coral text-white"
                            : "border-muted/30"
                        }`}
                      >
                        {checked && <Check className="h-3 w-3" />}
                      </div>
                      <span className="flex-1 text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted">{item.quantity}</span>
                      <span className="text-sm font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ),
      )}

      <div className="rounded-3xl bg-white p-5 card-shadow">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold">Estimated Total</span>
          <span className="font-display text-2xl font-bold text-coral">
            ${budget.total.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">
          Budget: ${budget.budgetLimit === 999 ? "∞" : budget.budgetLimit}
        </p>
        <p className="mt-3 italic text-ink/80">&ldquo;{budget.chefVerdict}&rdquo;</p>
      </div>
    </div>
  );
}
