"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "@/lib/constants";
import { ChefAvatar } from "../chef-avatar";
import { StreamingText } from "../streaming-text";

export function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2200);
    const progInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 95));
    }, 120);
    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
    };
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ChefAvatar mood="cooking" size="xl" />
      </motion.div>

      <div className="mt-10 min-h-[3rem] text-center">
        <p className="font-display text-xl font-semibold text-ink">
          <StreamingText
            key={msgIndex}
            text={LOADING_MESSAGES[msgIndex]}
            speed={30}
          />
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/50">
        <motion.div
          className="h-full bg-coral"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
    </div>
  );
}
