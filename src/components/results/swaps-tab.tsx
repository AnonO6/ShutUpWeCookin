"use client";

import { ArrowRight, RefreshCw } from "lucide-react";
import type { Substitution } from "@/lib/types";
import { GhostButton } from "../ui/button";

const reasonColor: Record<string, string> = {
  "dairy-free": "bg-sky",
  budget: "bg-mint",
  "pantry swap": "bg-yellow-soft",
  dietary: "bg-lilac",
};

export function SwapsTab({
  substitutions,
  onRegenerate,
}: {
  substitutions: Substitution[];
  onRegenerate: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <GhostButton onClick={onRegenerate}>
          <span className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Regenerate
          </span>
        </GhostButton>
      </div>

      {substitutions.map((swap, i) => (
        <div
          key={i}
          className="rounded-3xl bg-white p-5 card-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-2xl bg-lavender/60 px-4 py-3 text-center">
              <p className="text-xs text-muted">Original</p>
              <p className="font-semibold">{swap.original}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-coral" />
            <div className="flex-1 rounded-2xl bg-mint/40 px-4 py-3 text-center">
              <p className="text-xs text-muted">Swap</p>
              <p className="font-semibold">{swap.substitute}</p>
            </div>
          </div>
          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${reasonColor[swap.reason] ?? "bg-lilac"}`}
          >
            {swap.reason}
          </span>
          <p className="mt-2 text-sm italic text-ink/70">
            &ldquo;{swap.chefNote}&rdquo;
          </p>
        </div>
      ))}
    </div>
  );
}
