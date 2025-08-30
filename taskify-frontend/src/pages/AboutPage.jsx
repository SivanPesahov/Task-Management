import React from "react";
import useIntersectionShow from "@/utils/observerFunc";

export const AboutPage = () => {
  useIntersectionShow();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-900 via-sky-950 to-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_70%_at_50%_0%,rgba(56,189,248,0.28)_0%,rgba(2,6,23,0)_60%),radial-gradient(60%_60%_at_50%_100%,rgba(2,132,199,0.14)_0%,rgba(2,6,23,0)_60%)]"
      />

      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm reveal-up">
            About Taskify
          </h1>
          <p className="mt-6 text-sky-100/90 text-lg md:text-xl leading-relaxed reveal-up delay-150">
            Taskify is a modern task management system that streamlines
            organization, tracking, and collaboration. We combine simplicity
            experience.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 reveal-up delay-200">
            {[
              "Fast & responsive",
              "Clean UI",
              "Built with React + Tailwind",
            ].map((txt) => (
              <span
                key={txt}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-sky-100/90 backdrop-blur-sm"
              >
                {txt}
              </span>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 reveal-up delay-300">
            <a
              href="#team"
              className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sky-100 hover:bg-white/10 transition"
            >
              Meet the team
            </a>
            <a
              href="#vision"
              className="inline-flex items-center rounded-lg bg-sky-500/90 px-5 py-2.5 text-white hover:bg-sky-500 transition shadow-lg shadow-sky-500/20"
            >
              Our vision
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 animate-bounce text-white/70">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9l-7 7-7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <section id="team" className="relative py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-white reveal-up">
              Our Team
            </h2>
            <p className="mt-4 text-sky-100/90 max-w-2xl mx-auto reveal-up delay-150">
              Behind Taskify is a small, dedicated group of product builders who
              craft clean and simple experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-up delay-300">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:bg-white/10 transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20">
                  <svg
                    className="h-6 w-6 text-sky-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 14c3.866 0 7-3.134 7-7S15.866 0 12 0 5 3.134 5 7s3.134 7 7 7Zm0 2c-5.33 0-10 2.239-10 5v1h20v-1c0-2.761-4.67-5-10-5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Team Member {i}
                </h3>
                <p className="mt-2 text-sm text-sky-100/80">
                  Product & Engineering
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="relative py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-white reveal-up">
            Our Vision
          </h2>
          <p className="mt-6 text-lg md:text-xl text-sky-100/90 leading-relaxed reveal-up delay-150">
            To build the fastest, simplest task platform—one that lets everyone
            focus on the work itself, not the tool. Superb user experience,
            speed, and reliability are our core values.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 reveal-up delay-300">
            {["Speed", "Simplicity", "Focus"].map((label) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition"
              >
                <h4 className="text-white font-semibold">{label}</h4>
                <p className="mt-2 text-sm text-sky-100/80">
                  {label === "Speed" &&
                    "High performance and responsiveness on every device."}
                  {label === "Simplicity" &&
                    "A clean, clear, and intuitive UI—without unnecessary noise."}
                  {label === "Focus" &&
                    "Features that help you get work done, not distract from it."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
};
