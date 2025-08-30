import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  House,
  CircleHelp,
  LayoutList,
  CircleUserRound,
  FilePlus2,
  Menu,
} from "lucide-react";

function Header() {
  const { loggedInUser, logout } = useContext(AuthContext);

  if (!loggedInUser) {
    return null;
  }

  const initial = (loggedInUser?.username?.[0] || "?").toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-center relative px-3 sm:px-4">
        <div className="absolute left-3 sm:left-4 flex items-center gap-1 sm:gap-2">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/Tasks/List">Tasks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create">Create Task</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            <NavLink to="/">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="icon"
                  aria-label="Home"
                >
                  <House className="h-5 w-5" />
                </Button>
              )}
            </NavLink>

            <nav className="ml-1 sm:ml-2 flex">
              <ul className="flex items-center gap-1 sm:gap-2">
                <li>
                  <NavLink to="/about">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="icon"
                        aria-label="About"
                      >
                        <CircleHelp className="h-5 w-5" />
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="icon"
                        aria-label="Contact"
                      >
                        <CircleUserRound className="h-5 w-5" />
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Tasks/List">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="icon"
                        aria-label="Tasks"
                      >
                        <LayoutList className="h-5 w-5" />
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="icon"
                        aria-label="Create Task"
                      >
                        <FilePlus2 className="h-5 w-5" />
                      </Button>
                    )}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <Link to="/" className="select-none">
          <p className="text-sm font-semibold tracking-wide sm:text-base bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Taskify
          </p>
        </Link>

        <div className="absolute right-3 sm:right-4 flex items-center gap-1 sm:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
