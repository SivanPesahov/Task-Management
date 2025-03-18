import React from "react";
import { CircleHelp } from "lucide-react";
import { LayoutList } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { FilePlus2 } from "lucide-react";
import { PanelTop } from "lucide-react";
import useIntersectionShow from "@/utils/observerFunc";
import { Link } from "react-router-dom";

export const HomePage = () => {
  useIntersectionShow();

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-8 space-y-8">
        <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h1 className="text-5xl text-sky-900 font-bold mb-4">
            Welcome to TaskMaster
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your ultimate tool for organizing and managing your tasks
            efficiently. Stay productive and achieve more with TaskMaster.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
            <button className="bg-sky-900 text-white py-3 px-6 rounded-md shadow-md text-lg">
              <Link to="/create">Get Started</Link>
            </button>
            <button className="bg-white text-sky-900 border border-sky-900 py-3 px-6 rounded-md shadow-md text-lg">
              <Link to="/about">Learn More</Link>
            </button>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-4xl text-sky-900 font-bold mb-4">
            Why Choose TaskMaster?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            TaskMaster offers a comprehensive suite of tools designed to help
            you manage your tasks effortlessly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <h3 className="text-2xl text-sky-900 font-bold mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-700">
                Our intuitive interface makes task management a breeze.
              </p>
            </div>
            <div className="p-4">
              <h3 className="text-2xl text-sky-900 font-bold mb-2">
                Stay Organized
              </h3>
              <p className="text-gray-700">
                Keep track of your tasks with our advanced organizational
                features.
              </p>
            </div>
            <div className="p-4">
              <h3 className="text-2xl text-sky-900 font-bold mb-2">
                Boost Productivity
              </h3>
              <p className="text-gray-700">
                Achieve your goals faster with our productivity-enhancing tools.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
