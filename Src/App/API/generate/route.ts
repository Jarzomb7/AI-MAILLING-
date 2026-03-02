// ============================================================
// API ROUTE – POST /api/generate
// Generuje cold mail przez OpenAI API
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  buildHasWebsitePrompt,
  buildNoWebsitePrompt,
  SYSTEM_PROMPT,
  FormData,
} from "@/app/lib/prompts";

// Klucz API pobierany z .env.local – nigdy nie trafia do frontendu
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData: FormData = body;

    // Walidacja wymaganych pól
    if (!formData.companyName || !formData.industry || !formData.city) {
      return NextResponse.json(
        { error: "Brakujące wymagane pola: nazwa firmy, branża, miasto." },
        { status: 400 }
      );
    }

    // Wybór promptu zależnie od posiadania strony
    const userPrompt = formData.hasWebsite
      ? buildHasWebsitePrompt(formData)
      : buildNoWebsitePrompt(formData);

    // Budowanie wiadomości
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    // Jeśli mamy zrzut ekranu – tryb vision (GPT-4o)
    if (formData.hasWebsite && formData.screenshotBase64) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          {
            type: "image_url",
            image_url: {
              url: formData.screenshotBase64, // "data:image/png;base64,..."
              detail: "high",
            },
          },
        ],
      });
    } else {
      messages.push({ role: "user", content: userPrompt });
    }

    // ============================================================
    // WYWOŁANIE OPENAI API
    // Zmień OPENAI_MODEL w .env.local aby użyć innego modelu
    // ============================================================
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages,
      max_tokens: 1200,
      temperature: 0.75,
    });

    const generatedMail = completion.choices[0]?.message?.content;

    if (!generatedMail) {
      throw new Error("Model nie zwrócił treści maila.");
    }

    return NextResponse.json({ mail: generatedMail });

  } catch (error: unknown) {
    console.error("[/api/generate] Error:", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: "Nieprawidłowy klucz API OpenAI. Sprawdź plik .env.local." },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Przekroczono limit API OpenAI. Spróbuj ponownie za chwilę." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Wystąpił błąd podczas generowania maila. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
