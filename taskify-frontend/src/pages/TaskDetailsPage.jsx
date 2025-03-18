import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast";
import { getBackgroundColorClass } from "@/utils/taskColorFunc";

export const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
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
  }, [location.pathname]);

  async function handleDelete(ev) {
    ev.preventDefault();

    try {
      const { data } = await api.delete("/task/" + taskId);

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

      console.log(err);
    }
  }

  async function handleEdit(ev) {
    ev.preventDefault();
    navigate("/Tasks/edit/" + taskId);
  }

  const handleClose = () => {
    navigate("/Tasks/List");
  };

  const bgColorClass = getBackgroundColorClass(task.todoList);

  return (
    <>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogContent>
          <Card className={`shadow-2xl ${bgColorClass} text-black`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{task.title}</span>
              </CardTitle>
              <button
                className=" absolute right-1 top-1 cursor-pointer "
                onClick={handleClose}
              >
                <X color="red" />
              </button>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <div>
                  <Label>{task.description}</Label>
                </div>
                <div>
                  <Label>{task.body}</Label>
                </div>
                <div>
                  <ul>
                    {Array.isArray(task.todoList) &&
                      task.todoList.map((todoItem, index) => (
                        <li key={index}>
                          <Checkbox
                            checked={todoItem.isComplete}
                            className="mr-2"
                          />

                          {todoItem.title}
                        </li>
                      ))}
                  </ul>
                </div>

                <Button onClick={handleEdit} className={"bg-sky-900"}>
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className={"bg-sky-900"}>Remove</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
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
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};
