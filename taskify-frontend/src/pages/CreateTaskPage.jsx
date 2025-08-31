import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, CircleMinus, ListChecks } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const CreateTaskPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bodyRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleAdding(ev) {
    ev.preventDefault();
    const value = inputRef.current?.value?.trim();
    if (!value) return;
    setTodoList((prev) => [...prev, { title: value }]);
    inputRef.current.value = "";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAdding(e);
    }
  }

  function handleRemove(ev, index) {
    ev.preventDefault();
    setTodoList((prev) => prev.filter((_, i) => i !== index));
  }

  async function createTask(ev) {
    ev.preventDefault();
    if (isSubmitting) return;

    const titleValue = titleRef.current.value.trim();

    if (!titleValue) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for the task.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const valuesToAdd = {
      title: titleValue,
      description: descriptionRef.current.value.trim(),
      body: bodyRef.current.value.trim(),
      todoList: todoList,
    };

    try {
      setIsSubmitting(true);
      await api.post("task/create", valuesToAdd);
      toast({
        title: "Task Created",
        description: "The task has been successfully created.",
        status: "success",
        duration: 3000,
      });
      navigate("/create");
    } catch (err) {
      toast({
        title: "Error",
        description:
          "Something went wrong while creating the task. Please try again later.",
        status: "error",
        duration: 3000,
      });
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_100%_0%,hsl(var(--primary)/0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_0%_100%,hsl(var(--secondary)/0.12)_0%,transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Card className="rounded-2xl border border-border/60 shadow-2xl ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <CardHeader className="pb-4">
            <CardTitle className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <ListChecks className="h-5 w-5 text-primary" />
              </span>
              Create a new task
            </CardTitle>
            <div className="mt-1 text-sm text-muted-foreground">
              Keep it concise. You can refine details and subtasks below.
            </div>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={createTask}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter a clear, concise title"
                  ref={titleRef}
                />
                <p className="text-xs text-muted-foreground">Required</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Short summary (optional)"
                  ref={descriptionRef}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Details</label>
                <textarea
                  placeholder="Add more context, links, acceptance criteria, etc."
                  ref={bodyRef}
                  className="min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Subtasks</label>
                  {todoList?.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {todoList.length} item{todoList.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {todoList?.length > 0 && (
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <ul className="space-y-2">
                      {todoList.map((todo, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm shadow-sm"
                        >
                          <span className="truncate pr-3">{todo.title}</span>
                          <button
                            type="button"
                            aria-label={`Remove ${todo.title}`}
                            onClick={(ev) => handleRemove(ev, index)}
                            className="inline-flex items-center gap-1 text-destructive hover:opacity-80"
                          >
                            <CircleMinus className="h-4 w-4" /> Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add a subtask and press Enter"
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAdding}
                    className="inline-flex items-center gap-2"
                  >
                    <CirclePlus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Task"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
