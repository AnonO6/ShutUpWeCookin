"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { VIBE_CHIPS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { PhotoUploadSection } from "../photo-upload";
import { ProgressDots } from "../progress-dots";
import { SpeechBubble } from "../speech-bubble";
import { PrimaryButton } from "../ui/button";

export function VibeScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { inputs, setInputs } = useAppStore();
  const selectedChip = VIBE_CHIPS.find((c) => c.id === inputs.selectedVibeId);

  return (
    <div className="mx-auto min-h-dvh max-w-2xl px-5 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onBack} className="rounded-full bg-white p-2 card-shadow">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <ProgressDots step={1} />
        <div className="w-9" />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-3xl font-bold text-ink">
          What&apos;s going on today?
        </h2>
        <p className="mt-1 text-muted">Tell me your vibe. I&apos;ll handle the rest.</p>

        <div className="mt-6 rounded-3xl bg-white p-5 card-shadow">
          <textarea
            value={inputs.vibe}
            onChange={(e) =>
              setInputs({ vibe: e.target.value, selectedVibeId: undefined })
            }
            placeholder="e.g. I just broke up and I want to eat something outrageously good…"
            rows={4}
            className="w-full resize-none rounded-2xl bg-lavender/60 px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-coral/30"
          />
        </div>

        <div className="chip-scroll mt-4 flex gap-2 overflow-x-auto pb-2">
          {VIBE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() =>
                setInputs({
                  vibe: chip.text,
                  selectedVibeId: chip.id,
                })
              }
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                inputs.selectedVibeId === chip.id
                  ? "bg-coral text-white shadow-md shadow-coral/25"
                  : "bg-white text-ink card-shadow hover:scale-105"
              }`}
              style={
                inputs.selectedVibeId !== chip.id
                  ? { backgroundColor: chip.color + "88" }
                  : undefined
              }
            >
              {chip.emoji} {chip.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <PhotoUploadSection
            fridgeImage={inputs.fridgeImage}
            inspoImage={inputs.inspoImage}
            detectedIngredients={inputs.detectedIngredients}
            onFridgeChange={(img) => setInputs({ fridgeImage: img })}
            onInspoChange={(img) => setInputs({ inspoImage: img })}
            onIngredientsDetected={(ingredients) =>
              setInputs({ detectedIngredients: ingredients })
            }
          />
        </div>

        <div className="mt-6">
          <SpeechBubble
            text={
              selectedChip?.chefLine ??
              "Spill it. The messier the vibe, the better the meal."
            }
          />
        </div>

        <div className="mt-8 flex justify-end">
          <PrimaryButton onClick={onNext} disabled={!inputs.vibe.trim()}>
            Next →
          </PrimaryButton>
        </div>
      </motion.div>
    </div>
  );
}
