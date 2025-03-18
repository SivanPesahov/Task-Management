import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";

import { ModeToggle } from "@/components/mode-toggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { House } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { LayoutList } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { FilePlus2 } from "lucide-react";
function Header() {
  const context = useContext(AuthContext);
  const loggedInUser = context.loggedInUser;

  return (
    <header className="bg-white/5 px-4 flex justify-between items-center h-14">
      <div className="flex">
        <Link className="text-primary uppercase font-bold text-xl" to="/">
          <House />
        </Link>
        <nav className="ml-2">
          <ul className="flex gap-2">
            <li>
              <Link to="/about">
                <CircleHelp />
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <CircleUserRound />
              </Link>
            </li>
            <li>
              <Link to="/Tasks/List">
                <LayoutList />
              </Link>
            </li>
            <li>
              <Link to="/create">
                <FilePlus2 />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <p>Taskify</p>
      </div>

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src={context.loggedInUser.imgUrl} /> */}
              <AvatarFallback>
                {loggedInUser.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={context.logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
