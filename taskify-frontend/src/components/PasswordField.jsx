import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";

/**
 * PasswordField
 * Props:
 *  - control: form.control (react-hook-form)
 *  - name?: string (ברירת מחדל "password")
 *  - show: boolean (האם להציג סיסמה כטקסט)
 *  - onToggle: () => void (מחליף מצב show)
 */
export default function PasswordField({
  control,
  name = "password",
  show,
  onToggle,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="Enter password..."
                type={show ? "text" : "password"}
                autoComplete="current-password"
                {...field}
              />
              <button
                type="button"
                onClick={onToggle}
                className="absolute inset-y-0 right-2 inline-flex items-center rounded-md px-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
