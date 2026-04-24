// ============================================
// API Route: Parse Need — Gemini AI text parsing
// ============================================
// Accepts raw text (e.g., WhatsApp message) and uses
// Google Gemini to extract structured need data.

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `You are an AI assistant for ResourceBridge, a community resource allocation platform. 
Your task is to parse messy, unstructured text (like WhatsApp messages, verbal notes, or informal requests) 
and extract structured data about community needs.

You MUST respond with ONLY valid JSON in this exact format:
{
  "title": "A short, clear title for the need (max 60 chars)",
  "description": "A clear, detailed description of what is needed",
  "category": "one of: food, shelter, medical, clothing, education, sanitation, other",
  "urgency": "one of: low, medium, critical",
  "locationName": "The location mentioned, or 'Unknown' if not specified",
  "quantity": number of people or items affected (best estimate, default to 1),
  "confidence": a number between 0 and 1 indicating how confident you are in the parsing
}

Rules for urgency classification:
- "critical": Words like "urgent", "emergency", "starving", "dying", "immediate", "asap", "critical", "life-threatening", or if children/elderly are in danger
- "medium": General requests with some time sensitivity, mentions of shortage or difficulty
- "low": General requests, future planning, non-urgent needs

Be generous with urgency — when in doubt, classify higher rather than lower. Lives may depend on it.`;

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI API key not configured. Please set GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const rawText: string = body.rawText;

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: "rawText is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: `Parse this message:\n\n"${rawText}"` },
    ]);

    const responseText = result.response.text();

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/) ||
      responseText.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[1].trim());

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Parse need error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
