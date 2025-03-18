import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import api from "@/services/api.service";

import TaskList from "@/components/TaskList";
import { Outlet } from "react-router-dom";

export const TasksPage = () => {
  const context = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

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
    <>
      <TaskList tasks={tasks} isPinned={true} />
      <TaskList tasks={tasks} isPinned={false} />
      <Outlet />
    </>
  );
};
