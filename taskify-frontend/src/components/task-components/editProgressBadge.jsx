export function computeProgress(todoList = []) {
  const total = Array.isArray(todoList) ? todoList.length : 0;
  const done = total ? todoList.filter((t) => t?.isComplete).length : 0;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { total, done, pct };
}

// UI: Progress badge (exportable)
export function ProgressBadge({ completed, total, pct, tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] leading-none ${tone.badgeBg} ${tone.badgeText} ${tone.border}`}
    >
      {completed}/{total} done • {pct}%
    </span>
  );
}
