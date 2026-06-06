"use client";

import { Download, Share, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { useAppStore } from "@/lib/store";
import { PrimaryButton } from "./ui/button";

export function InstallPrompt() {
  const { showInstallPrompt, setShowInstallPrompt } = useAppStore();
  const { install, canInstall, isInstalled, showIOSInstructions } =
    usePwaInstall();

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-24 left-4 right-4 z-30 mx-auto max-w-md rounded-2xl bg-white p-4 card-shadow"
        >
          <button
            onClick={() => setShowInstallPrompt(false)}
            className="absolute right-3 top-3"
          >
            <X className="h-4 w-4 text-muted" />
          </button>

          <p className="pr-6 text-sm font-medium text-ink">
            Add me to your home screen. I&apos;ll be here when you inevitably
            can&apos;t cook again.
          </p>

          {canInstall ? (
            <div className="mt-3">
              <PrimaryButton
                onClick={async () => {
                  const ok = await install();
                  if (ok) setShowInstallPrompt(false);
                }}
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Install Chef-chan
                </span>
              </PrimaryButton>
            </div>
          ) : showIOSInstructions ? (
            <p className="mt-2 flex items-center gap-2 text-xs text-muted">
              <Share className="h-3.5 w-3.5 shrink-0" />
              Tap Share, then &ldquo;Add to Home Screen&rdquo;
            </p>
          ) : (
            <p className="mt-2 text-xs text-muted">
              Open in Chrome/Safari on your phone to install
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
