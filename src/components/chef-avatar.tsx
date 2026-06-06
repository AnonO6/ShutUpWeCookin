"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Mood = "idle" | "thinking" | "cooking" | "presenting";

const moodMotion: Record<Mood, { className: string; animate?: object }> = {
  idle: { className: "animate-float" },
  thinking: {
    className: "",
    animate: { rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 1.2 } },
  },
  cooking: { className: "animate-stir" },
  presenting: { className: "animate-float" },
};

export function ChefAvatar({
  mood = "idle",
  size = "lg",
  className = "",
}: {
  mood?: Mood;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: { box: "h-12 w-12", img: 48 },
    md: { box: "h-20 w-20", img: 80 },
    lg: { box: "h-36 w-36", img: 144 },
    xl: { box: "h-64 w-56 md:h-80 md:w-64", img: 320 },
  };

  const { box, img } = sizes[size];
  const motionCfg = moodMotion[mood];

  return (
    <motion.div
      className={`relative ${box} ${motionCfg.className} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, ...motionCfg.animate }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFB4C8]/30 via-[#D4C8FF]/20 to-transparent blur-lg" />
      <Image
        src="/anime_rudy.png"
        alt="Chef-chan"
        width={img}
        height={img}
        priority={size === "xl"}
        className="relative h-full w-full object-contain object-bottom drop-shadow-[0_8px_24px_rgba(45,42,62,0.18)] mix-blend-screen"
      />
    </motion.div>
  );
}
