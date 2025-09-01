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
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasksCount() {
      try {
        const { data } = await api.get("/task/tasks");
        setTasksCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        console.log(err);
        setError("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasksCount();
  }, []);

  const firstName = context?.loggedInUser?.firstName || "User";
  const lastName = context?.loggedInUser?.lastName || "";
  const username = context?.loggedInUser?.username || "anonymous";
  const email = context?.loggedInUser?.email || "-";
  const avatarLetter = (username?.[0] || "U").toUpperCase();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Card className="w-full max-w-4xl mx-4 overflow-hidden shadow-lg">
          <div className="h-40 w-full bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 animate-pulse" />
          <CardContent className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200/70 rounded" />
                  <div className="h-5 w-40 bg-gray-200/70 rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <Card className="w-full max-w-xl mx-4 border-destructive/30">
          <CardHeader>
            <CardTitle className="text-red-700">Something went wrong</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4 sm:p-8">
      <Card className="shadow-xl w-full max-w-4xl mx-4 overflow-hidden border-sky-900/20">
        {/* Header */}
        <CardHeader className="relative bg-gradient-to-r from-sky-800 via-sky-900 to-sky-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),rgba(0,0,0,0)_60%)]" />
          <div className="relative z-10 flex items-center">
            <div className="shrink-0">
              <Avatar className="h-24 w-24 ring-4 ring-white/20">
                {/* Uncomment when you have user image */}
                {/* <AvatarImage src={context.loggedInUser.imgUrl} alt="User avatar" /> */}
                <AvatarFallback className="text-2xl bg-white/10 text-white">
                  {avatarLetter}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-4 sm:ml-6">
              <CardTitle className="text-2xl sm:text-3xl tracking-tight">
                {firstName} {lastName}
              </CardTitle>
              <CardDescription className="text-sky-100/90 text-base">
                @{username}
              </CardDescription>
            </div>
            <div className="ml-auto text-right hidden sm:block">
              <div className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-sm backdrop-blur">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                {tasksCount} tasks
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 sm:p-8">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group rounded-lg border border-gray-200/70 p-4 hover:border-sky-300 transition-colors">
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                First Name
              </dt>
              <dd className="mt-1 text-base font-medium text-gray-900 dark:text-white">
                {firstName}
              </dd>
            </div>

            <div className="group rounded-lg border border-gray-200/70 p-4 hover:border-sky-300 transition-colors">
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                Last Name
              </dt>
              <dd className="mt-1 text-base font-medium text-gray-900 dark:text-white">
                {lastName || "-"}
              </dd>
            </div>

            <div className="group rounded-lg border border-gray-200/70 p-4 hover:border-sky-300 transition-colors">
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                Username
              </dt>
              <dd className="mt-1 text-base font-medium text-gray-900 dark:text-white">
                @{username}
              </dd>
            </div>

            <div className="group rounded-lg border border-gray-200/70 p-4 hover:border-sky-300 transition-colors">
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                Email
              </dt>
              <dd className="mt-1 text-base font-medium text-gray-900 dark:text-white break-all">
                {email}
              </dd>
            </div>

            <div className="group rounded-lg border border-gray-200/70 p-4 hover:border-sky-300 transition-colors sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                Tasks
              </dt>
              <dd className="mt-1 text-base font-medium text-gray-900 dark:text-white">
                You have{" "}
                <span className="font-semibold text-sky-700">{tasksCount}</span>{" "}
                tasks
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};
