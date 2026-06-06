"use client";

import { Camera, Heart, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { DetectedIngredient } from "@/lib/types";

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PhotoUploadSection({
  fridgeImage,
  inspoImage,
  detectedIngredients,
  onFridgeChange,
  onInspoChange,
  onIngredientsDetected,
}: {
  fridgeImage?: string;
  inspoImage?: string;
  detectedIngredients: DetectedIngredient[];
  onFridgeChange: (img?: string) => void;
  onInspoChange: (img?: string) => void;
  onIngredientsDetected: (ingredients: DetectedIngredient[]) => void;
}) {
  const fridgeRef = useRef<HTMLInputElement>(null);
  const inspoRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);

  async function handleFridge(file: File) {
    const dataUrl = await readFile(file);
    onFridgeChange(dataUrl);
    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze-fridge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });
      const data = await res.json();
      onIngredientsDetected(data.ingredients ?? []);
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleInspo(file: File) {
    const dataUrl = await readFile(file);
    onInspoChange(dataUrl);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-3xl bg-white p-5 card-shadow">
        <div className="mb-3 flex items-center gap-2">
          <Camera className="h-5 w-5 text-coral" />
          <div>
            <p className="font-display font-bold text-ink">Snap My Fridge</p>
            <p className="text-sm text-muted">I&apos;ll figure out what you can actually make</p>
          </div>
        </div>

        {fridgeImage ? (
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={fridgeImage}
              alt="Fridge"
              width={400}
              height={300}
              className="h-48 w-full object-cover"
              unoptimized
            />
            {analyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
            {detectedIngredients.map((ing) => (
              <div
                key={ing.name}
                className="absolute rounded-xl px-2.5 py-1.5 text-xs font-semibold text-ink shadow-md"
                style={{
                  left: `${ing.x}%`,
                  top: `${ing.y}%`,
                  backgroundColor: ing.color,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p>{ing.name}</p>
                <p className="font-normal opacity-70">{ing.uses}</p>
              </div>
            ))}
            <button
              onClick={() => {
                onFridgeChange(undefined);
                onIngredientsDetected([]);
              }}
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 shadow"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fridgeRef.current?.click()}
            className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-lilac/60 bg-lavender/50 transition hover:border-coral/40"
          >
            <Camera className="h-8 w-8 text-muted" />
            <span className="text-sm text-muted">Tap to snap fridge</span>
          </button>
        )}
        <input
          ref={fridgeRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFridge(file);
          }}
        />
      </div>

      <div className="relative rounded-3xl bg-white p-5 card-shadow">
        <div className="mb-3 flex items-center gap-2">
          <Heart className="h-5 w-5 text-coral" />
          <div>
            <p className="font-display font-bold text-ink">Show Inspo</p>
            <p className="text-sm text-muted">Upload a dish you&apos;re craving</p>
          </div>
        </div>

        {inspoImage ? (
          <div className="relative flex h-36 items-end justify-center">
            <Image
              src={inspoImage}
              alt="Inspiration"
              width={200}
              height={200}
              className="absolute -top-4 h-32 w-32 rotate-3 rounded-full object-cover shadow-xl"
              unoptimized
            />
            <button
              onClick={() => onInspoChange(undefined)}
              className="absolute right-0 top-0 rounded-full bg-white p-1.5 shadow"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inspoRef.current?.click()}
            className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-lilac/60 bg-lavender/50 transition hover:border-coral/40"
          >
            <Heart className="h-8 w-8 text-muted" />
            <span className="text-sm text-muted">Upload food inspo</span>
          </button>
        )}
        <input
          ref={inspoRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleInspo(file);
          }}
        />
      </div>
    </div>
  );
}
