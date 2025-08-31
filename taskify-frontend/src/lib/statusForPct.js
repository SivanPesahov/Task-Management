export const statusForPct = (pct) => {
  if (pct >= 100) {
    return {
      badgeBg: "bg-emerald-100 dark:bg-emerald-900/40",
      badgeText: "text-emerald-800 dark:text-emerald-200",
      ring: "ring-emerald-300/50",
      border: "border-emerald-300 dark:border-emerald-700",
      bar: "bg-emerald-500",
      title: "text-emerald-900 dark:text-emerald-100",
    };
  }
  if (pct >= 67) {
    return {
      badgeBg: "bg-yellow-100 dark:bg-yellow-900/40",
      badgeText: "text-yellow-800 dark:text-yellow-200",
      ring: "ring-yellow-300/50",
      border: "border-yellow-300 dark:border-yellow-700",
      bar: "bg-yellow-500",
      title: "text-yellow-900 dark:text-yellow-100",
    };
  }
  if (pct >= 34) {
    return {
      badgeBg: "bg-amber-100 dark:bg-amber-900/40",
      badgeText: "text-amber-800 dark:text-amber-200",
      ring: "ring-amber-300/50",
      border: "border-amber-300 dark:border-amber-700",
      bar: "bg-amber-500",
      title: "text-amber-900 dark:text-amber-100",
    };
  }
  return {
    badgeBg: "bg-rose-100 dark:bg-rose-900/40",
    badgeText: "text-rose-800 dark:text-rose-200",
    ring: "ring-rose-300/50",
    border: "border-rose-300 dark:border-rose-700",
    bar: "bg-rose-500",
    title: "text-rose-900 dark:text-rose-100",
  };
};
