"use client";

import { ChefAvatar } from "./chef-avatar";

export function SpeechBubble({
  text,
  showAvatar = true,
  size = "md",
}: {
  text: string;
  showAvatar?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const textSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex items-start gap-3">
      {showAvatar && <ChefAvatar size="sm" className="shrink-0" />}
      <div className="relative flex-1 rounded-2xl bg-white px-4 py-3 card-shadow speech-tail">
        <p className={`${textSize[size]} leading-relaxed text-ink italic`}>
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </div>
  );
}
