import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import AuthContext from "../contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import useIntersectionShow from "@/utils/observerFunc";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MarketingPane from "@/components/MarketingPane";
import PasswordField from "@/components/PasswordField";

function LoginPage() {
  const context = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useIntersectionShow();

  const LoginSchema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values) {
    try {
      await context.login(values);
      setTimeout(() => {
        if (localStorage.getItem("jwt-taskify")) {
          navigate("/", { replace: true });
        } else {
          toast({
            title: "Error logging in",
            description: "Username or password are incorrect",
          });
        }
      }, 500);
    } catch (err) {
      toast({
        title: "Login failed",
        description: "Something went wrong... please try again",
      });
      console.log(err);
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
                  <span className="text-2xl">Login</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-2.5 py-1 text-sm font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">
                    <LogIn className="h-4 w-4" />
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
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter username..."
                                autoComplete="username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <PasswordField
                        control={form.control}
                        show={showPassword}
                        onToggle={() => setShowPassword((v) => !v)}
                      />
                    </CardContent>

                    <CardFooter className="flex-col w-full">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting
                          ? "Logging in..."
                          : "Login"}
                      </Button>
                      <Link to="/auth/register" className="w-full">
                        <Button variant="outline" className="w-full mt-2">
                          Register
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

export default LoginPage;
