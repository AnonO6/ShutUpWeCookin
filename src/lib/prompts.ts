import { BUDGET_LABELS } from "./constants";
import type { UserInputs } from "./types";

export const CHEF_SYSTEM_PROMPT = `You are Chef-chan, a sassy, dominant, tsundere anime chef. You're a bit rude, very funny, secretly caring, and brutally honest. You give genuinely excellent culinary advice.

Always respond in valid JSON matching the requested schema. Keep Chef-chan's voice snarky but warm in all text fields. Use short punchy sentences.`;

export function buildGenerationPrompt(inputs: UserInputs, optimizeBudget = false) {
  const diets = inputs.diets.filter((d) => d !== "none").join(", ") || "no restrictions";
  const meals = inputs.meals.join(", ");
  const ingredients = inputs.detectedIngredients.map((i) => i.name).join(", ");

  return `Create a personalized meal plan for this user.

Vibe/mood: "${inputs.vibe}"
Budget: ${BUDGET_LABELS[inputs.budget]}
People: ${inputs.people}
Dietary: ${diets}
Meals needed: ${meals}
${ingredients ? `Fridge ingredients detected: ${ingredients}` : ""}
${inputs.inspoImage ? "User uploaded an inspiration dish photo — match that energy." : ""}
${optimizeBudget ? "OPTIMIZE FOR BUDGET: cut costs aggressively while keeping meals delicious." : ""}

Return JSON with this exact shape:
{
  "commentary": "Chef-chan's 2-3 sentence reaction to their vibe",
  "meals": [{
    "type": "breakfast|lunch|dinner|snacks",
    "name": "meal name",
    "difficulty": "Easy|Medium|Hard",
    "prepTime": "10 min",
    "cookTime": "20 min",
    "description": "2 lines in Chef-chan voice",
    "instructions": ["step 1", "step 2", ...],
    "vibeTag": "short tag like 💔 For the heartbreak",
    "emoji": "food emoji"
  }],
  "groceryList": [{
    "name": "ingredient",
    "quantity": "2 cups",
    "price": 3.50,
    "category": "produce|proteins|pantry|frozen"
  }],
  "substitutions": [{
    "original": "heavy cream",
    "substitute": "coconut milk",
    "reason": "dairy-free|budget|pantry swap|dietary",
    "chefNote": "short snarky note"
  }],
  "budget": {
    "total": 18.40,
    "budgetLimit": 25,
    "status": "under|over|way-over",
    "byCategory": [{"category": "Produce", "amount": 8, "color": "#B8F5D8"}],
    "perMeal": [{"meal": "Breakfast", "cost": 4.50}],
    "chefVerdict": "snarky budget verdict"
  }
}`;
}

export function buildFridgePrompt() {
  return `Analyze this fridge photo. Identify visible ingredients. Return JSON:
{
  "ingredients": [{
    "name": "ingredient name",
    "uses": "what you could make with it",
    "color": "#hex pastel color",
    "x": 20,
    "y": 30
  }]
}
x and y are percentage positions (0-100) for sticker overlays on the image. Return 4-8 ingredients.`;
}

export function buildChatPrompt(inputs: UserInputs, resultSummary: string) {
  return `Context: User vibe: "${inputs.vibe}". Their meal plan: ${resultSummary}. Answer follow-up cooking questions in Chef-chan's voice. Be helpful but snarky. Keep responses under 100 words.`;
}
