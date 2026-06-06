"use client";

import { motion } from "framer-motion";
import { ChefAvatar } from "../chef-avatar";
import { SpeechBubble } from "../speech-bubble";
import { PrimaryButton } from "../ui/button";

export function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col items-center justify-center gap-10 px-6 py-12 md:flex-row md:gap-16">
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
          PromptWars · Cooking To-Do
        </p>
        <h1 className="font-display text-5xl font-extrabold leading-tight text-ink md:text-7xl">
          Chef-chan
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted md:text-xl">
          I don&apos;t care about your feelings. I care about your dinner.
        </p>
        <div className="mt-8 hidden md:block">
          <SpeechBubble text="Oh great, another person who can't feed themselves. Fine. I'll help." />
        </div>
        <div className="mt-10">
          <PrimaryButton onClick={onStart} size="lg">
            Let&apos;s Cook
          </PrimaryButton>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ChefAvatar mood="idle" size="xl" />
        <div className="md:hidden">
          <SpeechBubble text="Oh great, another person who can't feed themselves. Fine. I'll help." />
        </div>
      </motion.div>
    </div>
  );
}
