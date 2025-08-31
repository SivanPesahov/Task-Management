export const ProgressBar = ({ progressPct, status, height = "h-2" }) => (
  <div className="mt-4">
    <div
      className={`${height} w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden`}
    >
      <div
        className={["h-full rounded-full", status.bar].join(" ")}
        style={{ width: `${progressPct}%` }}
      />
    </div>
  </div>
);
