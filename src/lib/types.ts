export type Budget = "broke" | "reasonable" | "treat" | "dont-care";
export type Diet =
  | "meat"
  | "veg"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "pescatarian"
  | "none";
export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";
export type AppStep = "landing" | "vibe" | "preferences" | "loading" | "results";
export type ResultsTab = "meals" | "grocery" | "swaps" | "budget";

export interface VibeChip {
  id: string;
  emoji: string;
  label: string;
  text: string;
  color: string;
  chefLine: string;
}

export interface DetectedIngredient {
  name: string;
  uses: string;
  color: string;
  x: number;
  y: number;
}

export interface UserInputs {
  vibe: string;
  selectedVibeId?: string;
  fridgeImage?: string;
  inspoImage?: string;
  detectedIngredients: DetectedIngredient[];
  budget: Budget;
  people: number;
  diets: Diet[];
  meals: MealType[];
}

export interface MealPlanItem {
  type: MealType;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  cookTime: string;
  description: string;
  instructions: string[];
  vibeTag: string;
  emoji: string;
}

export interface GroceryItem {
  name: string;
  quantity: string;
  price: number;
  category: "produce" | "proteins" | "pantry" | "frozen";
}

export interface Substitution {
  original: string;
  substitute: string;
  reason: "dairy-free" | "budget" | "pantry swap" | "dietary";
  chefNote: string;
}

export interface BudgetBreakdown {
  total: number;
  budgetLimit: number;
  status: "under" | "over" | "way-over";
  byCategory: { category: string; amount: number; color: string }[];
  perMeal: { meal: string; cost: number }[];
  chefVerdict: string;
}

export interface GenerationResult {
  commentary: string;
  meals: MealPlanItem[];
  groceryList: GroceryItem[];
  substitutions: Substitution[];
  budget: BudgetBreakdown;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
