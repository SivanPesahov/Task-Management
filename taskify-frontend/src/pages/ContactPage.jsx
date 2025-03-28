import React, { useContext, useRef } from "react";
import useIntersectionShow from "@/utils/observerFunc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AuthContext from "../contexts/AuthContext";

export const ContactPage = () => {
  useIntersectionShow();
  const context = useContext(AuthContext);
  const { toast } = useToast();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bodyRef = useRef(null);

  function handleComment(ev) {
    ev.preventDefault();
    const userData = {
      email: context.loggedInUser.email,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      body: bodyRef.current.value,
    };
    try {
      context.sendMail(userData);
      toast({
        title: "Comment sent",
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <section className="hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mb-4">
          Have questions or feedback? Get in touch with us. We're here to assist
          you and provide the support you need.
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
      <section className="hiddenn h-screen flex flex-col items-center justify-center text-center bg-sky-900 text-white p-8">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Enter your question here</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div>
                <Input placeholder={"Title"} ref={titleRef} />
              </div>
              <div>
                <Input placeholder={"Description"} ref={descriptionRef} />
              </div>
              <div>
                <Input placeholder={"body"} className={"h-24"} ref={bodyRef} />
              </div>

              <Button className={"bg-sky-900"} onClick={handleComment}>
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
