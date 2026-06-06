import type { Budget, VibeChip } from "./types";

export const VIBE_CHIPS: VibeChip[] = [
  {
    id: "heartbreak",
    emoji: "💔",
    label: "Heartbreak Fuel",
    text: "I just broke up and I want to eat something outrageously good that makes me forget they existed.",
    color: "#FFB4C8",
    chefLine: "Breakups? Amateur hour. Let me make you something so good you'll forget their name.",
  },
  {
    id: "workout",
    emoji: "💪",
    label: "Post-Workout",
    text: "Just crushed a workout and need protein-heavy fuel that doesn't taste like sadness.",
    color: "#B8F5D8",
    chefLine: "Muscles are crying. I'll feed them properly. Don't you dare skip the protein.",
  },
  {
    id: "lazy",
    emoji: "😴",
    label: "Lazy Sunday",
    text: "It's a lazy Sunday and I want maximum comfort with minimum effort.",
    color: "#D4C8FF",
    chefLine: "Lazy? Finally, honesty. I'll keep it simple. You're welcome in advance.",
  },
  {
    id: "celebration",
    emoji: "🎉",
    label: "Celebration",
    text: "Something amazing happened and I want a feast worthy of the occasion.",
    color: "#FFE4A8",
    chefLine: "A celebration? Fine. I'll make it memorable. Try not to cry when you taste it.",
  },
  {
    id: "broke",
    emoji: "💸",
    label: "Broke But Hungry",
    text: "I'm broke but starving and need something incredible on a shoestring budget.",
    color: "#FFD4B8",
    chefLine: "Broke AND hungry? My favorite challenge. Watch me work miracles with scraps.",
  },
  {
    id: "impress",
    emoji: "🔥",
    label: "Impress Someone",
    text: "I need to cook something that will absolutely blow someone's mind tonight.",
    color: "#FFB8B8",
    chefLine: "Trying to impress someone? Cute. Follow my plan exactly. No improvising.",
  },
  {
    id: "fridge",
    emoji: "❄️",
    label: "Fridge Roulette",
    text: "I have random stuff in my fridge and I need you to figure out what I can actually make.",
    color: "#B8E8FF",
    chefLine: "Fridge roulette? Show me this disaster. Don't be shy.",
  },
  {
    id: "brain",
    emoji: "🧠",
    label: "Big Brain Day",
    text: "Big brain work day — I need focus food that keeps me sharp without a crash.",
    color: "#C8E8FF",
    chefLine: "Brain food? Finally, someone who thinks ahead. I'll keep you sharp.",
  },
];

export const LOADING_MESSAGES = [
  "Judging your life choices…",
  "Cross-referencing 10,000 recipes…",
  "Calculating if you can actually afford this…",
  "Fine-tuning my masterpiece…",
  "Almost done. Try not to mess this up.",
];

export const BUDGET_LABELS: Record<Budget, string> = {
  broke: "Broke (<$10)",
  reasonable: "Reasonable ($10–25)",
  treat: "Treat Yourself ($25+)",
  "dont-care": "Don't Care",
};

export const BUDGET_LIMITS: Record<Budget, number> = {
  broke: 10,
  reasonable: 25,
  treat: 50,
  "dont-care": 999,
};

export const DIET_OPTIONS = [
  { id: "meat" as const, label: "🥩 Meat Lover" },
  { id: "veg" as const, label: "🥗 Veg" },
  { id: "vegan" as const, label: "🌱 Vegan" },
  { id: "gluten-free" as const, label: "🚫 Gluten-Free" },
  { id: "dairy-free" as const, label: "🥛 Dairy-Free" },
  { id: "none" as const, label: "No Restrictions" },
];

export const MEAL_OPTIONS = [
  { id: "breakfast" as const, label: "🌅 Breakfast" },
  { id: "lunch" as const, label: "☀️ Lunch" },
  { id: "dinner" as const, label: "🌙 Dinner" },
  { id: "snacks" as const, label: "🍿 Snacks" },
];

export const CATEGORY_META = {
  produce: { emoji: "🥦", label: "Produce", color: "#B8F5D8" },
  proteins: { emoji: "🥩", label: "Proteins", color: "#FFB8B8" },
  pantry: { emoji: "🧴", label: "Pantry", color: "#FFE4A8" },
  frozen: { emoji: "🧊", label: "Frozen", color: "#B8E8FF" },
};

export const STICKER_COLORS = ["#FFB4C8", "#B8F5D8", "#FFE4A8", "#B8E8FF", "#D4C8FF", "#FFD4B8"];
