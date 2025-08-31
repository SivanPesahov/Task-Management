import { statusForPct } from "../../lib/statusForPct";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Pin } from "lucide-react";
import { ProgressBadge } from "./progressBadge";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ProgressBar } from "./progressBar";

export const TaskCard = ({ task, isPinned = false }) => {
  const todoList = Array.isArray(task?.todoList) ? task.todoList : [];
  const total = todoList.length;
  const done = todoList.filter((t) => t?.isComplete).length;
  const progressLabel = total ? `${done}/${total}` : "0/0";
  const progressPct = total ? Math.round((done / total) * 100) : 0;
  const status = statusForPct(progressPct);

  return (
    <Card
      className={[
        "relative overflow-hidden transition-all duration-200",
        "hover:scale-[1.01] hover:shadow-xl",
        "shadow-sm",
        "bg-white dark:bg-zinc-900",
        `border ${status.border}`,
        `focus-within:ring-2 ${status.ring}`,
      ].join(" ")}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between gap-3">
          <span
            className={[
              "line-clamp-1 break-words font-semibold tracking-tight text-xl",
              status.title,
            ].join(" ")}
          >
            {task.title || "Untitled task"}
          </span>
          {isPinned && (
            <Pin className="shrink-0 size-5 opacity-70 group-hover:opacity-100" />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <ProgressBadge
          progressLabel={progressLabel}
          progressPct={progressPct}
          status={status}
        />
        <div className="flex flex-col gap-2 min-h-[3.5rem]">
          {task.description && (
            <Label className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-zinc-100">
              {task.description}
            </Label>
          )}
          {task.body && (
            <Label className="line-clamp-2 text-xs text-gray-700 dark:text-zinc-300">
              {task.body}
            </Label>
          )}
        </div>
        <ProgressBar progressPct={progressPct} status={status} />
      </CardContent>
    </Card>
  );
};
