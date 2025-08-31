import { CheckCircle2, Pin } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { statusForPct } from "../../lib/statusForPct";

export const TaskRow = ({ task, isPinned = false }) => {
  const todoList = Array.isArray(task?.todoList) ? task.todoList : [];
  const total = todoList.length;
  const done = todoList.filter((t) => t?.isComplete).length;
  const progressLabel = total ? `${done}/${total}` : "0/0";
  const progressPct = total ? Math.round((done / total) * 100) : 0;
  const status = statusForPct(progressPct);

  return (
    <Card
      className={[
        "relative overflow-hidden transition-colors",
        "bg-white dark:bg-zinc-900",
        `border ${status.border}`,
        `hover:bg-zinc-50 dark:hover:bg-zinc-900/80`,
      ].join(" ")}
    >
      <CardContent className="py-3">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={[
                  "font-semibold tracking-tight line-clamp-1 text-xl",
                  status.title,
                ].join(" ")}
              >
                {task.title || "Untitled task"}
              </span>
              {isPinned && <Pin className="size-4 opacity-80" />}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div
                className={[
                  "inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-[11px] shadow-sm",
                  status.badgeBg,
                  status.badgeText,
                ].join(" ")}
              >
                <CheckCircle2 className="size-3" />
                <span className="tabular-nums font-medium">
                  {progressLabel}
                </span>
                <span className="opacity-80">• {progressPct}%</span>
              </div>
            </div>
            {(task.description || task.body) && (
              <div className="mt-2 text-xs text-zinc-700 dark:text-zinc-300 line-clamp-1">
                {task.description || task.body}
              </div>
            )}
            <div className="mt-2">
              <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={["h-full rounded-full", status.bar].join(" ")}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
