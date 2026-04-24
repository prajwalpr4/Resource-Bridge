// ============================================
// API Route: Scan Document — Vision OCR + Gemini
// ============================================
// Accepts a base64 image, sends to Cloud Vision API
// for OCR, then passes extracted text to Gemini
// for structuring.

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const VISION_API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY || "";

const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;

const STRUCTURE_PROMPT = `You are an AI assistant for ResourceBridge. You have been given text extracted via OCR from a handwritten paper survey or form about community needs.

The text may be messy, incomplete, or have OCR errors. Do your best to interpret it.

Respond with ONLY valid JSON in this format:
{
  "title": "A short, clear title for the need (max 60 chars)",
  "description": "A clear, detailed description of what is needed",
  "category": "one of: food, shelter, medical, clothing, education, sanitation, other",
  "urgency": "one of: low, medium, critical",
  "locationName": "The location mentioned, or 'Unknown'",
  "quantity": number of people/items (best estimate, default 1),
  "confidence": number between 0 and 1
}`;

/** Step 1: Call Cloud Vision API for OCR */
async function extractTextFromImage(imageBase64: string): Promise<string> {
  // If no Vision API key, use Gemini's multimodal capabilities instead
  if (!VISION_API_KEY) {
    return ""; // Will fall through to Gemini vision
  }

  const response = await fetch(VISION_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        {
          image: { content: imageBase64 },
          features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Vision API error: ${response.statusText}`);
  }

  const data = await response.json();
  const annotations = data.responses?.[0]?.textAnnotations;

  if (!annotations || annotations.length === 0) {
    return "No text detected in the image.";
  }

  return annotations[0].description || "";
}

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const imageBase64: string = body.imageBase64;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "imageBase64 is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    let extractedText = "";
    let structuredData;

    if (VISION_API_KEY) {
      // Path A: Vision API → OCR → Gemini text parsing
      extractedText = await extractTextFromImage(imageBase64);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent([
        { text: STRUCTURE_PROMPT },
        { text: `OCR extracted text:\n\n"${extractedText}"` },
      ]);

      const responseText = result.response.text();
      const jsonMatch =
        responseText.match(/```(?:json)?\s*([\s\S]*?)```/) ||
        responseText.match(/(\{[\s\S]*\})/);

      if (jsonMatch) {
        structuredData = JSON.parse(jsonMatch[1].trim());
      }
    } else {
      // Path B: Use Gemini's multimodal vision directly
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent([
        { text: STRUCTURE_PROMPT },
        {
          text: "Extract and structure the text from this handwritten document image:",
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: imageBase64,
          },
        },
      ]);

      const responseText = result.response.text();
      extractedText = "Extracted via AI Vision";

      const jsonMatch =
        responseText.match(/```(?:json)?\s*([\s\S]*?)```/) ||
        responseText.match(/(\{[\s\S]*\})/);

      if (jsonMatch) {
        structuredData = JSON.parse(jsonMatch[1].trim());
      }
    }

    if (!structuredData) {
      return NextResponse.json(
        { error: "Failed to structure document data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      extractedText,
      structuredData,
    });
  } catch (error) {
    console.error("Scan document error:", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}
