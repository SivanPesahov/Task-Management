import { useContext, useRef } from "react";
import { useToast } from "../ui/use-toast";
import AuthContext from "../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ContactFormCard() {
  const { loggedInUser, sendMail } = useContext(AuthContext);
  const { toast } = useToast();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bodyRef = useRef(null);

  function handleSubmit(ev) {
    ev.preventDefault();
    const title = titleRef.current?.value?.trim();
    const description = descriptionRef.current?.value?.trim();
    const body = bodyRef.current?.value?.trim();

    if (!title || !description || !body) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }
    if (!loggedInUser?.email) {
      toast({
        title: "You must be logged in to send a message",
        duration: 3000,
      });
      return;
    }

    const userData = { email: loggedInUser.email, title, description, body };
    try {
      sendMail(userData);
      toast({ title: "Message sent ✅", duration: 3000 });
      if (titleRef.current) titleRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
      if (bodyRef.current) bodyRef.current.value = "";
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong. Try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-slate-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Send a message</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Title</label>
            <Input
              placeholder="Title"
              ref={titleRef}
              className="bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Description
            </label>
            <Input
              placeholder="Description"
              ref={descriptionRef}
              className="bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Message</label>
            <Textarea
              placeholder="Write your message..."
              ref={bodyRef}
              rows={6}
              className="bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit">Send</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (titleRef.current) titleRef.current.value = "";
                if (descriptionRef.current) descriptionRef.current.value = "";
                if (bodyRef.current) bodyRef.current.value = "";
              }}
            >
              Clear
            </Button>
          </div>
        </form>
        <p className="mt-3 text-xs text-slate-400">
          Direct messaging requires being logged in (JWT protected).
        </p>
      </CardContent>
    </Card>
  );
}
