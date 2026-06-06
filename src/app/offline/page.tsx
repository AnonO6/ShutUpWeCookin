"use client";

import { WifiOff } from "lucide-react";
import { ChefAvatar } from "@/components/chef-avatar";
import { PrimaryButton } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <ChefAvatar size="lg" mood="thinking" />
      <div>
        <WifiOff className="mx-auto mb-3 h-8 w-8 text-coral" />
        <h1 className="font-display text-2xl font-bold text-ink">
          You&apos;re offline
        </h1>
        <p className="mt-2 max-w-sm text-muted">
          Even I can&apos;t cook without internet. Get back online and try again.
        </p>
      </div>
      <PrimaryButton onClick={() => window.location.reload()}>
        Try Again
      </PrimaryButton>
    </div>
  );
}
