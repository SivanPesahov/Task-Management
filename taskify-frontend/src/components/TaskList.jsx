import React from "react";
import { Link } from "react-router-dom";
import { ListChecks } from "lucide-react";
import { Label } from "./ui/label";
import { TaskRow } from "./task-components/taskRow";
import { TaskCard } from "./task-components/taskCard";

export const EmptyTaskState = ({ isPinned = false }) => (
  <div className="w-full py-12 flex flex-col items-center justify-center text-center">
    <div className="mb-3 inline-flex items-center gap-2 text-muted-foreground">
      <ListChecks className="size-5" />
      <span>{isPinned ? "No pinned tasks yet" : "No tasks to show"}</span>
    </div>
    {!isPinned && (
      <p className="text-sm text-muted-foreground">
        Create a task to get started.
      </p>
    )}
  </div>
);

const TaskList = ({ tasks = [], isPinned = false, variant = "cards" }) => {
  const filtered = Array.isArray(tasks)
    ? tasks.filter((t) => t?.isPinned === isPinned)
    : [];

  if (!filtered.length) return <EmptyTaskState isPinned={isPinned} />;

  if (variant === "list") {
    return (
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {filtered.map((task) => (
          <li key={task._id} className="min-w-0">
            <Link to={`/Tasks/List/${task._id}`} className="group block">
              <TaskRow task={task} isPinned={isPinned} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0">
      {filtered.map((task) => (
        <li key={task._id} className="min-w-0">
          <Link to={`/Tasks/List/${task._id}`} className="group block">
            <TaskCard task={task} isPinned={isPinned} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
