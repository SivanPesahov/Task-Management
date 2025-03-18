import { useContext, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import AuthContext from "../contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import useIntersectionShow from "@/utils/observerFunc";
import { Arrow } from "@/components/Arrow";

function LoginPage() {
  const context = useContext(AuthContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useIntersectionShow();

  async function handleLogin(ev) {
    ev.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await context.login(userData);
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
        title: "TypeError",
        description: "Something went wrong... please try again",
      });
      console.log(err);
    }
  }

  return (
    <>
      <section className="hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 p-8">
        <h1 className="text-white text-4xl mb-4">
          Welcome to Your Task Manager
        </h1>
        <p className="text-white text-lg max-w-2xl">
          Manage your tasks effortlessly with our intuitive task manager. Stay
          organized and keep track of your daily, weekly, and monthly tasks.
        </p>
        <Arrow />
      </section>
      <section className="hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 p-8">
        <h1 className="text-white text-4xl mb-4">Plan Your Day</h1>
        <p className="text-white text-lg max-w-2xl mb-4">
          Start your day with a clear plan. Our task manager allows you to
          create, prioritize, and track tasks to boost your productivity.
        </p>
        <p className="text-white text-lg max-w-2xl">
          Whether you have personal tasks, work assignments, or project
          deadlines, our task manager is designed to help you stay on top of
          everything.
        </p>
      </section>
      <section className="hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 p-8">
        <h1 className="text-white text-4xl mb-4">Achieve Your Goals</h1>
        <p className="text-white text-lg max-w-2xl mb-4">
          Stay focused and achieve your goals with our powerful task manager.
          Track your progress, meet deadlines, and accomplish more.
        </p>
        <p className="text-white text-lg max-w-2xl">
          Sign up now to start managing your tasks efficiently and take the
          first step towards a more organized and productive life.
        </p>
      </section>
      <section className="section h-screen flex flex-col items-center justify-center text-center bg-sky-900 p-8">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Login</span> <LogIn />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <Label>Username:</Label>
                <Input ref={usernameRef} placeholder="Enter username..." />
              </div>
              <div>
                <Label>Password:</Label>
                <Input
                  type="password"
                  ref={passwordRef}
                  placeholder="Enter password..."
                />
              </div>
              <Button type="submit" className="bg-sky-900">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs">
              Don't have an account?{" "}
              <Link
                className="underline font-bold text-sky-900"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}

export default LoginPage;
