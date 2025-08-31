import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AuthContext from "../../contexts/AuthContext";

export function ContactInfoCard() {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-slate-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Get in touch</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300">
          Our team usually replies within 1–2 business days.
        </p>
        <ul className="mt-6 space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
              ✉️
            </span>
            <div>
              <p className="text-slate-200">Email</p>
              <p>support@taskify.app</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
              💬
            </span>
            <div>
              <p className="text-slate-200">Community</p>
              <p>Join our Discord to ask questions & share ideas.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-pink-300">
              📍
            </span>
            <div>
              <p className="text-slate-200">Location</p>
              <p>Petah Tikva, Israel</p>
            </div>
          </li>
        </ul>

        {!loggedInUser && (
          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-slate-300">
            Log in to send us a direct message.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
