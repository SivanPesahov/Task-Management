import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import { CircleMinus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const CreateTaskPage = () => {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bodyRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleAdding(ev) {
    ev.preventDefault();
    setTodoList((prev) => {
      const updatedTodoList = [...prev];
      updatedTodoList.push({ title: inputRef.current.value });
      return updatedTodoList;
    });
  }

  function handleRemove(ev, index) {
    ev.preventDefault();
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  }

  async function createTask(ev) {
    ev.preventDefault();
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
      const { data } = await api.post("task/create", valuesToAdd);
      navigate("/create");

      toast({
        title: "Task Created",
        description: "The task has been successfully created.",
        status: "success",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Error",
        description:
          "Something went wrong while creating the task. Please try again later.",
        status: "error",
        duration: 3000,
      });

      console.log(err);
    }
  }

  return (
    <>
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Create your new task</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div>
              <Input placeholder={"Title"} ref={titleRef} />
            </div>
            <div>
              <Input placeholder={"Description"} ref={descriptionRef} />
            </div>
            <div>
              <Input placeholder={"body"} className={"h-24"} ref={bodyRef} />
            </div>
            {todoList?.map((todo, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <p>{todo.title}</p>
                  <CircleMinus
                    onClick={(ev) => {
                      handleRemove(ev, index);
                    }}
                    data-index={index}
                  />
                </div>
              );
            })}
            <div className="flex">
              <Input placeholder={"Add mini task here"} ref={inputRef} />
              <div className="flex flex-col justify-center mx-2">
                <CirclePlus onClick={handleAdding} />
              </div>
            </div>

            <Button onClick={createTask} className={"bg-sky-900"}>
              Save Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
