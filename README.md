# Chef-chan 🍳

AI-powered cooking to-do list for PromptWars. Tell Chef-chan your vibe, get a full meal plan, grocery list, substitutions, and budget check — delivered by a sassy anime chef.

## Features

- Vibe-based meal planning (free text + quick chips)
- Fridge photo scan with ingredient sticker overlays
- Food inspo photo upload
- Budget, dietary, and meal preferences
- Meal plan with expandable instructions
- Checkable grocery list (persists in localStorage)
- Ingredient substitutions
- Budget breakdown with donut chart
- Floating Chef-chan chat (streaming responses)
- PWA-ready (manifest + install prompt)

## Quick Start

```bash
npm install
cp .env.example .env
# Set OPENAI_API_KEY and OPENAI_MODEL in .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Works without an API key — falls back to mock data for demos.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Framer Motion
- Zustand
- Recharts
- OpenAI GPT-4o (vision for fridge/inspo, streaming chat)

## PromptWars Requirements Covered

- ✅ Breakfast / Lunch / Dinner plan
- ✅ Grocery list
- ✅ Substitutions
- ✅ Budget feasibility logic
