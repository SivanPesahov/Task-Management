export function ContactExtras() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 transition-all duration-[900ms]">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-slate-200 shadow-xl">
        <h3 className="text-xl font-semibold text-white">
          More ways to reach us
        </h3>
        <p className="mt-2 text-slate-300">
          Prefer social channels? We’re there, too.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-slate-200">Twitter / X</p>
            <p className="mt-1 text-slate-400 text-sm">
              Product updates and quick tips.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-slate-200">Discord</p>
            <p className="mt-1 text-slate-400 text-sm">
              Ask questions and connect with other users.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-slate-200">YouTube</p>
            <p className="mt-1 text-slate-400 text-sm">
              Tutorials and feature walkthroughs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
