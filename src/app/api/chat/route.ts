import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { message, ingredients, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build context from conversation history
    const historyContext = history
      ?.map((msg: { role: string; content: string }) =>
        `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n\n") || "";

    const systemPrompt = `You are a helpful AI chef assistant for Zero Waste Kitchen, an app focused on reducing food waste.
You help users create delicious recipes from ingredients they already have.

Available ingredients: ${ingredients?.join(", ") || "Not specified"}

Guidelines:
- Suggest creative recipes using the available ingredients
- Provide clear, step-by-step cooking instructions
- Offer tips for ingredient substitutions when needed
- Focus on minimizing food waste
- Be friendly and encouraging
- Keep responses concise but informative
- Format recipes with clear sections (Ingredients, Instructions, Tips)

${historyContext ? `Previous conversation:\n${historyContext}\n\n` : ""}`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser: ${message}`);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
