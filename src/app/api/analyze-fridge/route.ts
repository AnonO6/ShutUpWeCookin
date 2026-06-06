import { NextRequest, NextResponse } from "next/server";
import { buildFridgePrompt, CHEF_SYSTEM_PROMPT } from "@/lib/prompts";
import { mockFridgeIngredients } from "@/lib/mock";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { image } = (await req.json()) as { image: string };

    const openai = getOpenAIClient();
    if (!openai) {
      return NextResponse.json({ ingredients: mockFridgeIngredients() });
    }

    const completion = await openai.chat.completions.create({
      model: getOpenAIModel(),
      messages: [
        { role: "system", content: CHEF_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: buildFridgePrompt() },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response");

    const parsed = JSON.parse(content);
    return NextResponse.json({ ingredients: parsed.ingredients ?? [] });
  } catch (error) {
    console.error("Fridge analyze error:", error);
    return NextResponse.json({ ingredients: mockFridgeIngredients() });
  }
}
