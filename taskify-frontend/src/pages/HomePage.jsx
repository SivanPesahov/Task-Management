import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutList, FilePlus2, User } from "lucide-react";
import useIntersectionShow from "@/utils/observerFunc";
import AuthContext from "@/contexts/AuthContext";

export const HomePage = () => {
  useIntersectionShow();
  const auth = useContext(AuthContext);
  const isLoggedIn = Boolean(auth?.user || auth?.loggedInUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <section className="reveal mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-sky-900 dark:text-sky-100">
            Plan, track, and ship your tasks
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-700 dark:text-slate-300">
            A clean, focused task manager that helps you stay organized without
            getting in the way.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/create" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full">
                    Create Task
                  </Button>
                </Link>
                <Link to="/Tasks/List" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full">
                    View Tasks
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </section>

        <section className="reveal mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-sky-900 dark:text-sky-100">
                <FilePlus2 className="h-4 w-4" /> Fast capture
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 dark:text-slate-300">
              Add tasks with titles, descriptions and checklists in seconds.
            </CardContent>
          </Card>

          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-sky-900 dark:text-sky-100">
                <LayoutList className="h-4 w-4" /> Stay organized
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 dark:text-slate-300">
              Pin important items and keep your list tidy and focused.
            </CardContent>
          </Card>

          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-sky-900 dark:text-sky-100">
                <User className="h-4 w-4" /> Your workspace
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 dark:text-slate-300">
              Manage your profile and view everything in one place.
            </CardContent>
          </Card>
        </section>

        {/* FEATURE GRID */}
        <section className="reveal mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="hover:shadow-sm transition border-slate-200/60 dark:border-slate-800/60">
            <CardHeader>
              <CardTitle className="text-xl text-sky-900 dark:text-sky-100">
                Simple by design
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 dark:text-slate-300 text-sm">
              Clear structure, sensible defaults, and zero clutter. Focus on
              work, not configuration.
            </CardContent>
          </Card>

          <Card className="hover:shadow-sm transition border-slate-200/60 dark:border-slate-800/60">
            <CardHeader>
              <CardTitle className="text-xl text-sky-900 dark:text-sky-100">
                Fast & responsive
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 dark:text-slate-300 text-sm">
              Built with Vite + React + Tailwind for snappy navigation across
              devices.
            </CardContent>
          </Card>

          <Card className="hover:shadow-sm transition border-slate-200/60 dark:border-slate-800/60">
            <CardHeader>
              <CardTitle className="text-xl text-sky-900 dark:text-sky-100">
                Secure by default
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 dark:text-slate-300 text-sm">
              JWT-based auth with protected routes for tasks and mail endpoints.
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
