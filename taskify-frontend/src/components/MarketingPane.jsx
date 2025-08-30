import { CheckCircle2 } from "lucide-react";

export default function MarketingPane() {
  return (
    <section className="hidden lg:block">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Take full control of your tasks
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Plan, prioritize, and track your progress. Taskify helps you stay
          focused and accomplish more in less time.
        </p>

        <ul className="mt-8 space-y-4 text-slate-700 dark:text-slate-200">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
            <span>Clean and fast UI with Tailwind + ShadCN</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
            <span>Secure authentication with JWT</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
            <span>Smart task lists, pinning, and progress tracking</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
