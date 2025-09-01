import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "../components/ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { statusForPct } from "../lib/statusForPct";
import { DialogTitle } from "../components/ui/dialog";
import { CEField } from "../components/edit-task-component/edit-input";
import { TaskSchema } from "../lib/edit-schema/editSchemas";
import {
  deleteTask,
  fetchTask,
  updateTask,
} from "../services/crud/taskFunctions";
import {
  computeProgress,
  ProgressBadge,
} from "../components/task-components/editProgressBadge";
import { PinTaskToggleField } from "../components/edit-task-component/pinTaskToggleField";
import { ChecklistItemField } from "../components/edit-task-component/checklistItemField";

export const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      isPinned: false,
      todoList: [],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, watch } = form;
  const { fields, update } = useFieldArray({
    control,
    name: "todoList",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTask(taskId);
        reset({
          title: data?.title || "",
          description: data?.description || "",
          body: data?.body || "",
          isPinned: !!data?.isPinned,
          todoList: Array.isArray(data?.todoList)
            ? data.todoList.map((t) => ({
                title: t.title || "",
                isComplete: !!t.isComplete,
              }))
            : [],
        });
      } catch (err) {}
    })();
  }, [taskId, reset]);

  const todoList = watch("todoList") || [];
  const {
    total: totalTodos,
    done: completedTodos,
    pct: progressPct,
  } = computeProgress(todoList);
  const tone = statusForPct(progressPct);

  function toggleTodoComplete(idx, checked) {
    const item = fields[idx];
    update(idx, { ...item, isComplete: !!checked });
  }

  async function onSubmit(values) {
    try {
      const payload = {
        title: values.title.trim(),
        description: (values.description || "").trim(),
        body: (values.body || "").trim(),
        isPinned: !!values.isPinned,
        todoList: Array.isArray(values.todoList) ? values.todoList : [],
      };

      await updateTask(taskId, payload);

      toast({
        title: "Saved",
        description: "Task updated successfully.",
        status: "success",
        duration: 2000,
      });

      navigate("/Tasks/List");
    } catch (err) {
      toast({
        title: "Update failed",
        description: "Could not save changes. Please try again.",
        status: "error",
        duration: 3000,
      });
    }
  }

  async function handleDelete(ev) {
    ev.preventDefault();
    try {
      await deleteTask(taskId);
      toast({
        title: "Task Deleted",
        description: "The task has been successfully deleted.",
        status: "success",
        duration: 3000,
      });
      navigate("/Tasks/List");
    } catch (err) {
      toast({
        title: "Error",
        description:
          "Something went wrong while deleting the task. Please try again later.",
        status: "error",
        duration: 3000,
      });
    }
  }

  const handleCloseX = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          navigate("/Tasks/List");
        }
      }}
    >
      <DialogContent className="bg-transparent shadow-none border-0">
        <VisuallyHidden>
          <DialogTitle>{watch("title") || "Task Details"}</DialogTitle>
        </VisuallyHidden>
        <Card className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-neutral-900/90 shadow-lg ring-1 ring-border backdrop-blur">
          <div
            className={`absolute left-0 top-0 h-1.5 rounded-tr-xl ${tone.bar}`}
            style={{ width: `${progressPct}%`, opacity: 0.85 }}
          />
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ProgressBadge
                  completed={completedTodos}
                  total={totalTodos}
                  pct={progressPct}
                  tone={tone}
                />
                <PinTaskToggleField control={control} form={form} />
              </div>
              <button
                aria-label="Close"
                className="inline-flex size-7 items-center justify-center rounded-md border text-foreground/70 hover:bg-foreground/5"
                onClick={handleCloseX}
              >
                <X className="size-4" />
              </button>
            </div>

            <CardTitle className="mt-3">
              <Form {...form}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CEField
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            autoFocus
                            singleLine
                            placeholder="Untitled task"
                            ariaLabel="Task title"
                            className="border-b border-transparent focus:border-b-foreground/40 rounded-none px-0 text-[30px] font-semibold tracking-tight leading-tight"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardTitle>

            <div className="mt-3 h-px w-full bg-border" />
          </CardHeader>

          <CardContent className="p-5 pt-4">
            <Form {...form}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                <div className="space-y-6">
                  <section className="space-y-1">
                    <FormField
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wide text-foreground/60">
                            Description
                          </FormLabel>
                          <FormControl>
                            <CEField
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              placeholder="Add a short description..."
                              ariaLabel="Task description"
                              className="min-h-[24px] border-b border-transparent focus:border-b-foreground/40 rounded-none px-0 text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  <section className="space-y-1">
                    <FormField
                      control={control}
                      name="body"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wide text-foreground/60">
                            Body
                          </FormLabel>
                          <FormControl>
                            <CEField
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              placeholder="Write details here..."
                              ariaLabel="Task body"
                              className="min-h-[24px] border-b border-transparent focus:border-b-foreground/40 rounded-none px-0 text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs uppercase tracking-wide text-foreground/60">
                      Checklist
                    </Label>
                    {totalTodos ? (
                      <span className="text-[11px] text-foreground/60">
                        {completedTodos}/{totalTodos}
                      </span>
                    ) : null}
                  </div>

                  <ul className="divide-y divide-border rounded-md border">
                    {fields.map((item, index) => (
                      <ChecklistItemField
                        key={item.id}
                        itemId={item.id}
                        index={index}
                        control={control}
                        watch={watch}
                        onToggle={toggleTodoComplete}
                      />
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 flex items-center justify-between">
                  <div
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${tone.chip}`}
                  >
                    {progressPct}% Complete
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="h-8 px-3">
                        Remove
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your task and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
