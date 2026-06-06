import { NextRequest, NextResponse } from "next/server";
import type OpenAI from "openai";
import { buildGenerationPrompt, CHEF_SYSTEM_PROMPT } from "@/lib/prompts";
import { mockGeneration } from "@/lib/mock";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";
import type { UserInputs } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { inputs, optimizeBudget } = (await req.json()) as {
    inputs: UserInputs;
    optimizeBudget?: boolean;
  };

  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return NextResponse.json(mockGeneration(inputs, optimizeBudget));
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: CHEF_SYSTEM_PROMPT },
      { role: "user", content: buildGenerationPrompt(inputs, optimizeBudget) },
    ];

    if (inputs.inspoImage) {
      messages[1] = {
        role: "user",
        content: [
          { type: "text", text: buildGenerationPrompt(inputs, optimizeBudget) },
          { type: "image_url", image_url: { url: inputs.inspoImage } },
        ],
      };
    }

    const completion = await openai.chat.completions.create({
      model: getOpenAIModel(),
      messages,
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from OpenAI");

    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(mockGeneration(inputs, optimizeBudget));
  }
}
