import React, { useEffect } from "react";
import useIntersectionShow from "@/utils/observerFunc";

export const AboutPage = () => {
  useIntersectionShow();

  return (
    <div>
      <section className=" hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 p-8">
        <h1 className="text-white text-4xl mb-4">About Us</h1>
        <p className="text-white text-lg max-w-2xl">
          Learn more about our mission and values. Discover who we are and why
          we're passionate about what we do.
        </p>
        <div className="absolute bottom-4 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </section>
      <section className=" hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 p-8">
        <h1 className="text-white text-4xl mb-4">Our Team</h1>
        <p className="text-white text-lg max-w-2xl mb-4">
          Meet the passionate individuals behind our success. Learn about our
          team members and their roles.
        </p>
        <p className="text-white text-lg max-w-2xl">
          We believe in collaboration, innovation, and making a positive impact
          in the world.
        </p>
      </section>
      <section className="hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 p-8">
        <h1 className="text-white text-4xl mb-4">Our Vision</h1>
        <p className="text-white text-lg max-w-2xl mb-4">
          Discover our vision for the future. Find out how we envision shaping
          the industry and serving our customers.
        </p>
        <p className="text-white text-lg max-w-2xl">
          Join us on our journey to redefine excellence and inspire change.
        </p>
      </section>
    </div>
  );
};
