# Cold Mail Generator

Generator spersonalizowanych cold maili dla agencji webowych, zbudowany na Next.js + OpenAI GPT-4o.

## Szybki start

```bash
npm install
cp .env.example .env.local
# Uzupełnij OPENAI_API_KEY w .env.local
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

## Deploy na Vercel

1. Wrzuć kod na GitHub
2. Importuj repo na [vercel.com](https://vercel.com)
3. Dodaj zmienne środowiskowe:
   - `OPENAI_API_KEY` = twój klucz z platform.openai.com
   - `OPENAI_MODEL` = `gpt-4o`
4. Kliknij Deploy

## Struktura

- `src/app/page.tsx` – Strona główna
- `src/app/api/generate/route.ts` – API Route (OpenAI)
- `src/app/components/` – Komponenty React
- `src/lib/prompts.ts` – Szablony promptów
