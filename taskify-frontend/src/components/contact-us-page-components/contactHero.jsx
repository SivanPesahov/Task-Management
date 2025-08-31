import { useEffect, useState } from "react";

export function ContactHero() {
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-12 pb-8 text-center text-white">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Contact <span className="text-sky-400">Taskify</span>
      </h1>
      <p className="mt-3 text-slate-300">
        Have questions or feedback? We’d love to hear from you.
      </p>
      <div
        className={`mt-8 flex justify-center transition-opacity duration-700 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-bounce text-slate-300" aria-hidden>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
