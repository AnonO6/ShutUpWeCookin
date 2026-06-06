import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppStep,
  ChatMessage,
  GenerationResult,
  ResultsTab,
  UserInputs,
} from "./types";

const defaultInputs: UserInputs = {
  vibe: "",
  detectedIngredients: [],
  budget: "reasonable",
  people: 1,
  diets: ["none"],
  meals: ["breakfast", "lunch", "dinner"],
};

interface AppState {
  step: AppStep;
  inputs: UserInputs;
  result: GenerationResult | null;
  activeTab: ResultsTab;
  checkedGroceries: string[];
  chatOpen: boolean;
  chatMessages: ChatMessage[];
  showInstallPrompt: boolean;
  setStep: (step: AppStep) => void;
  setInputs: (partial: Partial<UserInputs>) => void;
  setResult: (result: GenerationResult | null) => void;
  setActiveTab: (tab: ResultsTab) => void;
  toggleGrocery: (key: string) => void;
  setChatOpen: (open: boolean) => void;
  addChatMessage: (message: ChatMessage) => void;
  updateLastAssistantMessage: (content: string) => void;
  setShowInstallPrompt: (show: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      step: "landing",
      inputs: defaultInputs,
      result: null,
      activeTab: "meals",
      checkedGroceries: [],
      chatOpen: false,
      chatMessages: [],
      showInstallPrompt: false,
      setStep: (step) => set({ step }),
      setInputs: (partial) =>
        set({ inputs: { ...get().inputs, ...partial } }),
      setResult: (result) => set({ result }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleGrocery: (key) => {
        const current = get().checkedGroceries;
        set({
          checkedGroceries: current.includes(key)
            ? current.filter((k) => k !== key)
            : [...current, key],
        });
      },
      setChatOpen: (open) => set({ chatOpen: open }),
      addChatMessage: (message) =>
        set({ chatMessages: [...get().chatMessages, message] }),
      updateLastAssistantMessage: (content) => {
        const messages = [...get().chatMessages];
        const last = messages[messages.length - 1];
        if (last?.role === "assistant") {
          messages[messages.length - 1] = { ...last, content };
        }
        set({ chatMessages: messages });
      },
      setShowInstallPrompt: (show) => set({ showInstallPrompt: show }),
      reset: () =>
        set({
          step: "landing",
          inputs: defaultInputs,
          result: null,
          activeTab: "meals",
          chatMessages: [],
          chatOpen: false,
        }),
    }),
    {
      name: "chef-chan-storage",
      partialize: (state) => ({
        checkedGroceries: state.checkedGroceries,
        showInstallPrompt: state.showInstallPrompt,
      }),
    },
  ),
);
