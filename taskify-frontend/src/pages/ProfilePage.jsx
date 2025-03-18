import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import api from "@/services/api.service";

export const ProfilePage = () => {
  const context = useContext(AuthContext);
  const [tasksCount, setTasksCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasksCount() {
      try {
        const { data } = await api.get("/task/tasks");
        setTasksCount(data.length);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTasksCount();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center ">
      <Card className="shadow-lg w-full max-w-4xl mx-4">
        <CardHeader className="bg-sky-900">
          <div className="flex justify-center items-center">
            <Avatar className="h-24 w-24 flex items-center justify-center text-center">
              {/* <AvatarImage src={context.loggedInUser.imgUrl} /> */}
              <AvatarFallback>
                {context.loggedInUser.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <CardTitle className="text-2xl">
                {context.loggedInUser.firstName} {context.loggedInUser.lastName}
              </CardTitle>
              <CardDescription>
                @{context.loggedInUser.username}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  First Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {context.loggedInUser.firstName}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {context.loggedInUser.lastName}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {context.loggedInUser.username}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {context.loggedInUser.email}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Tasks</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  You have {tasksCount} tasks
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
