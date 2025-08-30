import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import AuthContext from "../contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import MarketingPane from "@/components/MarketingPane";
import PasswordField from "@/components/PasswordField";
import TextField from "@/components/TextField";

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .trim(),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .trim(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .trim(),
    email: z.string().email("Enter a valid email address").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function RegisterPage() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Choose a username...",
      autoComplete: "username",
    },
    {
      name: "firstName",
      label: "First name",
      placeholder: "Enter first name...",
      autoComplete: "given-name",
    },
    {
      name: "lastName",
      label: "Last name",
      placeholder: "Enter last name...",
      autoComplete: "family-name",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter email...",
      type: "email",
      autoComplete: "email",
    },
  ];

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      await context.register({
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });

      if (context.loggedInUser) {
        const greetingMail = {
          email: values.email,
          title: "Welcome to Taskify!",
          description: `Welcome ${values.firstName}`,
          body: "We are happy to register you to Taskify!",
        };
        context.sendMail?.(greetingMail);
        navigate("/", { replace: true });
      } else {
        toast({
          title: "Error registering",
          description:
            "Registration failed, please check your details and try again",
        });
      }
    } catch (err) {
      toast({
        title: "Registration failed",
        description: "Something went wrong... please try again",
      });
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-stretch px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <MarketingPane />

          <section className="flex w-full items-center justify-center py-10">
            <Card className="w-full max-w-md backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/60 shadow-xl border-slate-200/60 dark:border-slate-800/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl">Create account</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-2.5 py-1 text-sm font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">
                    <UserPlus className="h-4 w-4" />
                    Secure
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <CardContent className="space-y-4">
                      {fields.map((f) => (
                        <TextField
                          key={f.name}
                          control={form.control}
                          name={f.name}
                          label={f.label}
                          placeholder={f.placeholder}
                          type={f.type}
                          autoComplete={f.autoComplete}
                        />
                      ))}

                      <PasswordField
                        control={form.control}
                        name="password"
                        show={showPassword}
                        onToggle={() => setShowPassword((v) => !v)}
                      />

                      <PasswordField
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
                        autoComplete="new-password"
                        show={showConfirm}
                        onToggle={() => setShowConfirm((v) => !v)}
                      />
                    </CardContent>

                    <CardFooter className="flex-col w-full">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting
                          ? "Creating account..."
                          : "Register"}
                      </Button>
                      <Link to="/auth/login" className="w-full">
                        <Button variant="outline" className="w-full mt-2">
                          Back to Login
                        </Button>
                      </Link>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
