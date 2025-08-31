import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import api from "@/services/api.service";

import TaskList from "@/components/TaskList";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

export const TasksPage = () => {
  const context = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("cards");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const { data } = await api.get("/task/tasks");
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTasks();
  }, [location.pathname]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <div className="inline-flex items-center gap-2">
          <Button
            variant={view === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("cards")}
            className="gap-2"
          >
            <LayoutGrid className="size-4" /> Cards
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
            className="gap-2"
          >
            <List className="size-4" /> List
          </Button>
        </div>
      </div>

      <TaskList tasks={tasks} isPinned={true} variant={view} />
      <TaskList tasks={tasks} isPinned={false} variant={view} />
      <Outlet />
    </div>
  );
};
