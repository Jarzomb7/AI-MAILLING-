"use client";

import { useState, useRef, useCallback } from "react";
import { FormData } from "@/app/lib/prompts";

interface MailFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export default function MailForm({ onSubmit, isLoading }: MailFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    websiteUrl: "",
    industry: "",
    city: "",
    hasWebsite: true,
    screenshotBase64: undefined,
  });

  const [fileName, setFileName] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(file);
    });

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Plik za duży. Maks. 5MB."); return; }
    try {
      const base64 = await fileToBase64(file);
      setFormData((p) => ({ ...p, screenshotBase64: base64 }));
      setFileName(file.name);
    } catch { alert("Nie udało się wczytać pliku."); }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files[0] || null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.industry || !formData.city) {
      alert("Wypełnij wymagane pola: Nazwa firmy, Branża, Miasto.");
      return;
    }
    onSubmit(formData);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/70 focus:bg-slate-800/80 transition-all duration-200 hover:border-slate-600";
  const labelClass = "block text-sm font-medium text-slate-400 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nazwa firmy */}
      <div>
        <label className={labelClass}>Nazwa firmy <span className="text-blue-400">*</span></label>
        <input
          type="text"
          placeholder="np. Zakład Ślusarski Kowalski"
          value={formData.companyName}
          onChange={(e) => setFormData((p) => ({ ...p, companyName: e.target.value }))}
          className={inputClass}
          required
        />
      </div>

      {/* Branża + Miasto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Branża <span className="text-blue-400">*</span></label>
          <input
            type="text"
            placeholder="np. usługi ślusarskie"
            value={formData.industry}
            onChange={(e) => setFormData((p) => ({ ...p, industry: e.target.value }))}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Miasto <span className="text-blue-400">*</span></label>
          <input
            type="text"
            placeholder="np. Kraków"
            value={formData.city}
            onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Status strony */}
      <div>
        <label className={labelClass}>Status strony internetowej</label>
        <div className="flex gap-4">
          {([true, false] as const).map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => setFormData((p) => ({ ...p, hasWebsite: val }))}
              className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                ${formData.hasWebsite === val
                  ? "bg-blue-500/20 border-blue-500/60 text-blue-300"
                  : "bg-slate-800/40 border-slate-700/50 text-slate-500 hover:border-slate-600"
                }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                ${formData.hasWebsite === val ? "border-blue-400" : "border-slate-600"}`}>
                {formData.hasWebsite === val && <span className="w-2 h-2 rounded-full bg-blue-400" />}
              </span>
              {val ? "☑ Firma ma stronę" : "☐ Firma nie ma strony"}
            </button>
          ))}
        </div>
      </div>

      {/* Link (warunkowy) */}
      {formData.hasWebsite && (
        <div className="animate-fadeIn">
          <label className={labelClass}>Link do strony <span className="text-slate-600">(opcjonalny)</span></label>
          <input
            type="url"
            placeholder="https://www.przykladfirmy.pl"
            value={formData.websiteUrl}
            onChange={(e) => setFormData((p) => ({ ...p, websiteUrl: e.target.value }))}
            className={inputClass}
          />
        </div>
      )}

      {/* Upload zrzutu (warunkowy) */}
      {formData.hasWebsite && (
        <div className="animate-fadeIn">
          <label className={labelClass}>Zrzut ekranu strony <span className="text-slate-600">(PNG, JPG – maks. 5MB)</span></label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full p-6 rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-2 text-sm transition-all duration-200
              ${dragOver ? "border-blue-400/70 bg-blue-500/10" : fileName ? "border-green-500/50 bg-green-500/10" : "border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"}`}
          >
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg" className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
            {fileName ? (
              <>
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400 font-medium">{fileName}</span>
                <span className="text-slate-500 text-xs">Kliknij aby zmienić</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-400">Przeciągnij plik lub <span className="text-blue-400">kliknij</span></span>
                <span className="text-slate-600 text-xs">PNG, JPG do 5MB</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Przycisk */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 relative overflow-hidden
          ${isLoading
            ? "bg-slate-700 text-slate-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99]"
          }`}
      >
        {isLoading ? "Generowanie..." : "✦ Generuj cold mail"}
      </button>
    </form>
  );
}
