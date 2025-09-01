import z from "zod";

export const TodoItemSchema = z.object({
  title: z.string().trim().min(1, "Todo title is required").max(200),
  isComplete: z.boolean().optional().default(false),
});

export const TaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional().default(""),
  body: z.string().trim().optional().default(""),
  isPinned: z.boolean().optional().default(false),
  todoList: z.array(TodoItemSchema).optional().default([]),
});
