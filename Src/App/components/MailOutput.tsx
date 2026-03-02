"use client";

import { useState } from "react";

interface MailOutputProps {
  mail: string;
}

export default function MailOutput({ mail }: MailOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mail);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = mail;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h2 className="text-lg font-semibold text-white">Wygenerowany mail</h2>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
            ${copied
              ? "bg-green-500/20 border-green-500/50 text-green-400"
              : "bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500"
            }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Skopiowano!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Kopiuj
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <textarea
          value={mail}
          readOnly
          rows={20}
          className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 text-sm leading-relaxed font-mono resize-y focus:outline-none focus:border-blue-500/50 selection:bg-blue-500/30"
        />
      </div>
    </div>
  );
}
