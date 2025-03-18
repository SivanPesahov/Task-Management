import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/services/api.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getBackgroundColorClass } from "@/utils/taskColorFunc";
import { CircleMinus } from "lucide-react";

export const EditTaskPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);
  const todoRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function getTask() {
      try {
        const { data } = await api.get("/task/" + taskId);
        setTask(data);
      } catch (err) {
        console.log(err);
      }
    }
    getTask();
  }, []);

  async function handleDelete(ev, index) {
    ev.preventDefault();
    const [...arr] = task.todoList;
    arr.splice(index, 1);
    const { data } = await api.patch("task/edit/" + taskId, {
      todoList: arr,
    });
    setTask(data);
  }

  async function handleAdding(ev) {
    ev.preventDefault();
    const [...arr] = task.todoList;
    const newTodo = { title: todoRef.current.value, isComplete: false };
    arr.push(newTodo);
    const { data } = await api.patch("task/edit/" + taskId, {
      todoList: arr,
    });
    setTask(data);
  }

  async function handleActivate(id, isComplete) {
    const newTodos = task.todoList.map((todo, i) => {
      if (todo._id === id) {
        return { ...todo, isComplete: !isComplete };
      } else {
        return todo;
      }
    });
    try {
      const { data } = await api.patch("task/edit/" + taskId, {
        todoList: newTodos,
      });

      setTask(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePin() {
    try {
      const { data } = await api.patch("task/edit/" + taskId, {
        isPinned: !task.isPinned,
      });
      setTask(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChanges(ev) {
    ev.preventDefault();
    const valuesToChange = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      body: contentRef.current.value,
    };
    if (!valuesToChange.title) {
      toast({
        title: "Invalid input",
        description: "Title is required.",
        status: "error",
        duration: 5000,
      });
      return;
    }

    try {
      const { data } = await api.patch("task/edit/" + taskId, valuesToChange);
      setTask(data);

      toast({
        title: "Success",
        description: "Task edited successfully.",
        status: "success",
        duration: 5000,
      });

      navigate("/Tasks/List/" + taskId);
    } catch (err) {
      toast({
        title: "Error while editing",
        description: "Something went wrong... please try again.",
        status: "error",
        duration: 5000,
      });
      console.log(err);
    }
  }

  const bgColorClass = getBackgroundColorClass(task.todoList);

  return (
    <>
      <Card className={`shadow-2xl ${bgColorClass} text-black`}>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Switch id="pin-mode" onClick={handlePin} checked={task.isPinned} />
            <Label htmlFor="airplane-mode">Pinning</Label>
          </div>
          <CardTitle className="flex justify-between items-center">
            <Input ref={titleRef} placeholder={task.title}></Input>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div>
              <Input
                ref={descriptionRef}
                placeholder={task.description}
              ></Input>
            </div>
            <div>
              <Input ref={contentRef} placeholder={task.body}></Input>
            </div>
            <div>
              <ul>
                {Array.isArray(task.todoList) &&
                  task.todoList.map((todoItem, index) => (
                    <li key={todoItem._id}>
                      <div className="flex justify-between">
                        <div>
                          <Checkbox
                            checked={todoItem.isComplete}
                            value={todoItem.isComplete}
                            onClick={(ev) =>
                              handleActivate(
                                todoItem._id,
                                ev.target.value === "true"
                              )
                            }
                            className="mr-2"
                          />
                          {todoItem.title}
                        </div>
                        <div>
                          <Button
                            onClick={(ev) => {
                              handleDelete(ev, index);
                            }}
                            className="h-7 mb-2 mr-2"
                          >
                            <CircleMinus />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="flex justify-between ">
                <Input
                  ref={todoRef}
                  placeholder="Add todo item..."
                  className="mr-6"
                ></Input>
                <div className="flex flex-col justify-center">
                  <Button onClick={handleAdding} className="h-7 mb-2">
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleChanges}>Save changes</Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};
