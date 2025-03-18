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

function RegisterPage() {
  const context = useContext(AuthContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const eMailRef = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleRegister(ev) {
    ev.preventDefault();

    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: eMailRef.current.value,
    };

    try {
      await context.register(userData);

      if (context.loggedInUser) {
        navigate("/", { replace: true });
      } else {
        toast({
          title: "Error registering",
          description:
            "Registration failed, please check your details and try again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "TypeError",
        description: "Something went wrong... please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      console.log(err.name);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="shadow-2xl ">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Register</span> <LogIn />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div>
              <Label>Username:</Label>
              <Input ref={usernameRef} placeholder="Enter username..." />
            </div>
            <div>
              <Label>Password:</Label>
              <Input
                ref={passwordRef}
                type="password"
                placeholder="Enter password..."
              />
            </div>
            <div>
              <Label>First name:</Label>
              <Input ref={firstNameRef} placeholder="Enter first name..." />
            </div>
            <div>
              <Label>Last name:</Label>
              <Input ref={lastNameRef} placeholder="Enter last name..." />
            </div>
            <div>
              <Label>EMail:</Label>
              <Input ref={eMailRef} placeholder="Enter last name..." />
            </div>

            <Button type="submit" className="bg-sky-900">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs">
            Already have an account?{" "}
            <Link className="underline font-bold text-sky-900" to="/auth/login">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
