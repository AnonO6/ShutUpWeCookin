import { BUDGET_LIMITS } from "./constants";
import type { DetectedIngredient, GenerationResult, UserInputs } from "./types";

export function mockFridgeIngredients(): DetectedIngredient[] {
  return [
    { name: "Eggs", uses: "omelette, fried rice", color: "#FFE4A8", x: 25, y: 35 },
    { name: "Spinach", uses: "salad, pasta", color: "#B8F5D8", x: 55, y: 28 },
    { name: "Cheese", uses: "grilled cheese, pasta", color: "#FFD4B8", x: 70, y: 55 },
    { name: "Tomatoes", uses: "salsa, bruschetta", color: "#FFB4C8", x: 40, y: 65 },
    { name: "Milk", uses: "smoothies, pancakes", color: "#B8E8FF", x: 15, y: 70 },
  ];
}

export function mockGeneration(inputs: UserInputs, optimizeBudget = false): GenerationResult {
  const limit = BUDGET_LIMITS[inputs.budget];
  const total = optimizeBudget ? Math.min(limit * 0.7, 12) : Math.min(limit * 0.85, 22);

  const meals = inputs.meals.map((type) => {
    const names: Record<string, { name: string; emoji: string; tag: string }> = {
      breakfast: { name: "Spicy Miso Ramen Bowl", emoji: "🍜", tag: "💔 Comfort fuel" },
      lunch: { name: "Crispy Gochujang Chicken Wrap", emoji: "🌯", tag: "🔥 Main character energy" },
      dinner: { name: "Garlic Butter Steak Bites", emoji: "🥩", tag: "✨ Forget-them feast" },
      snacks: { name: "Brown Butter Cookie Bites", emoji: "🍪", tag: "🍫 Emotional support" },
    };
    const m = names[type];
    return {
      type,
      name: m.name,
      difficulty: "Medium" as const,
      prepTime: "15 min",
      cookTime: "25 min",
      description:
        "You wanted something outrageous? This delivers. Don't thank me yet — cook it first.",
      instructions: [
        "Prep your ingredients. Yes, all of them. Stop being lazy.",
        "Heat the pan until it's actually hot. Patience is not your strong suit, I know.",
        "Cook the main component until golden. If it burns, that's on you.",
        "Assemble with confidence. Presentation matters, even for sad people.",
        "Eat immediately while it's hot. You earned this.",
      ],
      vibeTag: m.tag,
      emoji: m.emoji,
    };
  });

  return {
    commentary: `You want comfort food after whatever disaster you just described? Bold. Pathetic. But valid. I built you a plan that actually slaps. You're welcome.`,
    meals,
    groceryList: [
      { name: "Ramen noodles", quantity: "2 packs", price: 3.5, category: "pantry" },
      { name: "Chicken thighs", quantity: "1 lb", price: 5.99, category: "proteins" },
      { name: "Spinach", quantity: "1 bunch", price: 2.49, category: "produce" },
      { name: "Eggs", quantity: "6", price: 3.99, category: "proteins" },
      { name: "Gochujang", quantity: "1 jar", price: 4.99, category: "pantry" },
      { name: "Butter", quantity: "1 stick", price: 2.49, category: "pantry" },
      { name: "Frozen berries", quantity: "1 bag", price: 3.99, category: "frozen" },
    ],
    substitutions: [
      {
        original: "Heavy cream",
        substitute: "Coconut milk",
        reason: "dairy-free",
        chefNote: "Same richness, zero dairy drama. You're welcome.",
      },
      {
        original: "Chicken thighs",
        substitute: "Tofu",
        reason: "budget",
        chefNote: "Half the price, all the attitude. Marinate it properly.",
      },
      {
        original: "Fresh herbs",
        substitute: "Dried herbs",
        reason: "pantry swap",
        chefNote: "Use a third of the amount. Basic math, darling.",
      },
    ],
    budget: {
      total,
      budgetLimit: limit,
      status: total <= limit ? "under" : total <= limit * 1.2 ? "over" : "way-over",
      byCategory: [
        { category: "Produce", amount: 5.5, color: "#B8F5D8" },
        { category: "Proteins", amount: 9.98, color: "#FFB8B8" },
        { category: "Pantry", amount: 11.48, color: "#FFE4A8" },
        { category: "Frozen", amount: 3.99, color: "#B8E8FF" },
      ],
      perMeal: meals.map((m) => ({ meal: m.name, cost: +(total / meals.length).toFixed(2) })),
      chefVerdict:
        total <= limit
          ? `$${total.toFixed(2)}. Within budget. Barely. Don't congratulate yourself.`
          : `$${total.toFixed(2)}. Over budget. Pick cheaper swaps or stop being dramatic.`,
    },
  };
}
