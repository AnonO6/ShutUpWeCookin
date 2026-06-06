import { NextRequest } from "next/server";
import { buildChatPrompt, CHEF_SYSTEM_PROMPT } from "@/lib/prompts";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";
import type { UserInputs } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { message, inputs, resultSummary } = (await req.json()) as {
    message: string;
    inputs: UserInputs;
    resultSummary: string;
  };

  const encoder = new TextEncoder();
  const openai = getOpenAIClient();

  if (!openai) {
    const fallback =
      "No oven? Pan-sear it. Improvise. That's literally what kitchens are for. Next question.";
    const stream = new ReadableStream({
      start(controller) {
        for (const word of fallback.split(" ")) {
          controller.enqueue(encoder.encode(word + " "));
        }
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const completion = await openai.chat.completions.create({
    model: getOpenAIModel(),
    stream: true,
    temperature: 0.9,
    messages: [
      { role: "system", content: CHEF_SYSTEM_PROMPT },
      {
        role: "system",
        content: buildChatPrompt(inputs, resultSummary),
      },
      { role: "user", content: message },
    ],
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch {
        controller.enqueue(
          encoder.encode("My kitchen's on fire. Try again in a sec."),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
