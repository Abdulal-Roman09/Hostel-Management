import React, { useEffect, useState } from "react";
import {
  Menu,
  Home,
  CookingPot,
  Bed,
  Dock,
  Hamburger,
  LogOut,
  User,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import Logo from "./Logo";
import useAuth from "./../../Hooks/useAuth";
import NotificationPanel from "./NotificationPanel";
import { DropdownMenuDemo } from "./DropdownMenuDemo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logOut } = useAuth();

  const isLoggedIn = !!user;

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (user?.photoURL) {
      setPhoto(user.photoURL);
    }
  }, [user?.photoURL]);

  const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/allMeals", label: "AllMeals", icon: CookingPot },
    { href: "/upcoming-meals", label: "Upcoming Meals", icon: Hamburger },
  ];

  const loggedInLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Dock },
    { href: "/packages", label: "Packags", icon: Hamburger },
  ];

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* LEFT: Logo */}
        <Logo name={"kobi Jasimuddin Hall"}></Logo>

        {/* CENTER: Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map(({ href, label, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-orange-400 font-semibold "
                    : "text-muted-foreground"
                } hover:text-primary`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
          {isLoggedIn &&
            loggedInLinks.map(({ href, label, icon: Icon }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  } hover:text-primary`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
        </nav>

        {/* RIGHT: Auth Buttons / Avatar */}
        <div className="flex items-center gap-3">
          <ThemeToggle/>
          {/* MOBILE: Avatar + Sheet */}
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.photoURL || "/placeholder.svg"}
                        alt={user?.displayName || "User"}
                      />
                      <AvatarFallback>
                        {user?.displayName?.charAt(0) || (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="p-2">
                    <p className="font-medium">{user?.displayName}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <User className="h-4 w-4 mr-2" /> Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm">Login</Button>
                </Link>
              </>
            )}

            {/* Hamburger Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="p-4 space-y-2">
                  <span className="text-lg font-semibold flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    HostelPro
                  </span>
                  <nav className="flex flex-col gap-2 mt-4">
                    {navigationLinks.map(({ href, label, icon: Icon }) => (
                      <SheetClose asChild key={href}>
                        <Link
                          to={href}
                          className="flex items-center gap-2 rounded px-3 py-2 hover:bg-accent"
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </Link>
                      </SheetClose>
                    ))}
                    {isLoggedIn &&
                      loggedInLinks.map(({ href, label, icon: Icon }) => (
                        <SheetClose asChild key={href}>
                          <Link
                            to={href}
                            className="flex items-center gap-2 rounded px-3 py-2 hover:bg-accent"
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </Link>
                        </SheetClose>
                      ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* DESKTOP: Avatar or Login/Register */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* <NotificationPanel /> */}
                <DropdownMenuDemo />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 rounded-full p-0"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user?.photoURL || "/placeholder.svg"}
                          alt={user?.displayName || "User"}
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                        <AvatarFallback>
                          {user?.displayName?.charAt(0) || (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="p-2">
                      <p className="font-medium">{user?.displayName}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <Dock className="h-4 w-4 mr-2" /> Deshbord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="h-4 w-4 mr-2" /> Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
