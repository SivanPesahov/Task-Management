export function PageBackground() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 0%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(500px 250px at 80% 20%, rgba(16,185,129,0.12), transparent 60%), radial-gradient(500px 250px at 50% 90%, rgba(236,72,153,0.10), transparent 60%)",
        }}
      />
    </>
  );
}
