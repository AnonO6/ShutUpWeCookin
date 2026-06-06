"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChefChatDrawer } from "@/components/chef-chat-drawer";
import { InstallPrompt } from "@/components/install-prompt";
import { LandingScreen } from "@/components/screens/landing-screen";
import { LoadingScreen } from "@/components/screens/loading-screen";
import { PreferencesScreen } from "@/components/screens/preferences-screen";
import { ResultsScreen } from "@/components/screens/results-screen";
import { VibeScreen } from "@/components/screens/vibe-screen";
import { useAppStore } from "@/lib/store";
import type { GenerationResult } from "@/lib/types";

export default function Home() {
  const {
    step,
    setStep,
    inputs,
    setResult,
    setShowInstallPrompt,
    reset,
  } = useAppStore();

  async function generate(optimizeBudget = false) {
    setStep("loading");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, optimizeBudget }),
      });
      const data = (await res.json()) as GenerationResult;
      setResult(data);
      setStep("results");
      setShowInstallPrompt(true);
    } catch {
      setStep("preferences");
    }
  }

  return (
    <main className="min-h-dvh bg-lavender">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {step === "landing" && (
            <LandingScreen onStart={() => setStep("vibe")} />
          )}
          {step === "vibe" && (
            <VibeScreen
              onNext={() => setStep("preferences")}
              onBack={() => setStep("landing")}
            />
          )}
          {step === "preferences" && (
            <PreferencesScreen
              onGenerate={() => generate(false)}
              onBack={() => setStep("vibe")}
            />
          )}
          {step === "loading" && <LoadingScreen />}
          {step === "results" && (
            <ResultsScreen
              onRegenerate={() => generate(false)}
              onOptimizeBudget={() => generate(true)}
              onReset={reset}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <ChefChatDrawer />
      <InstallPrompt />
    </main>
  );
}
