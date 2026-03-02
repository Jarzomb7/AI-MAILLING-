"use client";

import { useState } from "react";
import MailForm from "./components/MailForm";
import MailOutput from "./components/MailOutput";
import Loader from "./components/Loader";
import { FormData } from "./lib/prompts";

export default function HomePage() {
  const [generatedMail, setGeneratedMail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleGenerate = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    setGeneratedMail("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Wystąpił nieznany błąd.");
      }

      setGeneratedMail(json.mail);

      // Scroll do wyniku na mobile
      setTimeout(() => {
        document.getElementById("mail-output")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Błąd połączenia z API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Dekoracyjne tło */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Powered by GPT-4o
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Cold Mail Generator
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Wpisz dane firmy, a AI wygeneruje spersonalizowany cold mail dostosowany do branży i lokalizacji.
          </p>
        </div>

        {/* Dwukolumnowy układ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formularz */}
          <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm font-bold">1</div>
              <h2 className="text-lg font-semibold">Dane firmy</h2>
            </div>
            <MailForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Wynik */}
          <div id="mail-output" className="rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm p-6 lg:p-8 shadow-2xl min-h-[400px] flex flex-col justify-center">
            {isLoading && <Loader />}

            {error && !isLoading && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-red-400 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong>Błąd</strong>
                </div>
                {error}
              </div>
            )}

            {generatedMail && !isLoading && <MailOutput mail={generatedMail} />}

            {!generatedMail && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center gap-4 text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-3xl">✉️</div>
                <div>
                  <h3 className="text-slate-300 font-medium mb-1">Tutaj pojawi się wygenerowany mail</h3>
                  <p className="text-slate-500 text-sm">Wypełnij formularz i kliknij „Generuj cold mail"</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                  {["Spersonalizowany", "Gotowy do wysłania", "Po polsku"].map((tag) => (
                    <div key={tag} className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />{tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          Cold Mail Generator • Zbudowany z Next.js + OpenAI
        </p>
      </div>
    </main>
  );
}
