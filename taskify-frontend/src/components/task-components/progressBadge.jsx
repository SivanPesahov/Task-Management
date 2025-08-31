import { CheckCircle2 } from "lucide-react";

export const ProgressBadge = ({ progressLabel, progressPct, status }) => (
  <div
    className={[
      "mb-3 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs shadow-sm",
      status.badgeBg,
      status.badgeText,
    ].join(" ")}
  >
    <CheckCircle2 className="size-4" />
    <span className="tabular-nums font-medium">{progressLabel}</span>
    <span className="opacity-80">• {progressPct}%</span>
  </div>
);
