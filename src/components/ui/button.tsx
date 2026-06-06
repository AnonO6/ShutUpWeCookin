"use client";

import { motion } from "framer-motion";

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "md" | "lg";
}) {
  const sizes = {
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`btn-shimmer rounded-full font-display font-bold text-white shadow-lg shadow-coral/25 transition disabled:opacity-50 ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink card-shadow transition hover:bg-white/80 ${className}`}
    >
      {children}
    </button>
  );
}
