"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { ChefAvatar } from "./chef-avatar";

const SUGGESTIONS = [
  "Can I make this without an oven?",
  "Faster version of dinner?",
  "What if I don't have soy sauce?",
];

export function ChefChatDrawer() {
  const {
    chatOpen,
    setChatOpen,
    chatMessages,
    addChatMessage,
    updateLastAssistantMessage,
    inputs,
    result,
  } = useAppStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  if (!result) return null;

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setInput("");
    addChatMessage({ role: "user", content: text });
    addChatMessage({ role: "assistant", content: "" });
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          inputs,
          resultSummary: result!.meals.map((m) => m.name).join(", "),
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          updateLastAssistantMessage(full);
        }
      }
    } finally {
      setLoading(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-xl shadow-coral/30"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setChatOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[75dvh] max-w-lg rounded-t-3xl bg-white card-shadow"
            >
              <div className="flex items-center justify-between border-b border-lavender px-5 py-4">
                <div className="flex items-center gap-3">
                  <ChefAvatar size="sm" mood="presenting" />
                  <div>
                    <p className="font-display font-bold">Ask Chef-chan</p>
                    <p className="text-xs text-muted">She&apos;s judging, but she&apos;ll help</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[45dvh] overflow-y-auto px-5 py-4">
                {chatMessages.length === 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted">Quick questions:</p>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="block w-full rounded-2xl bg-lavender/60 px-4 py-2.5 text-left text-sm transition hover:bg-lilac/40"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-coral text-white"
                          : "bg-lavender italic text-ink"
                      }`}
                    >
                      {msg.content || (loading && i === chatMessages.length - 1 ? "…" : "")}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="flex gap-2 border-t border-lavender px-5 py-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask her anything…"
                  className="flex-1 rounded-full bg-lavender/60 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading}
                  className="rounded-full bg-coral p-2.5 text-white disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
