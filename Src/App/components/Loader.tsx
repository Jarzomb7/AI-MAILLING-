// Komponent loadera z animacją spin
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-spin" />
        <div
          className="absolute inset-2 rounded-full border-t-2 border-purple-400 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>
      <p className="text-slate-400 text-sm animate-pulse">
        Analizuję dane i generuję mail...
      </p>
    </div>
  );
}
