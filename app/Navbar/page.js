"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/toggle";
import { MenuIcon, UserCircle, XIcon } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full text-foreground flex items-center justify-center">
      <div className="w-full rounded-md shadow-md  md:w-[80vw] flex items-center justify-between px-4 py-3 md:mt-2 md:px-8">
        {/* Logo / Title */}
        <div className="text-xl font-pixel text-primary tracking-wide group relative cursor-pointer">
          <span className="inline-block group-hover:translate-x-2 transition-all duration-300">
            D
          </span>
          <span className="ml-1 hidden md:inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
            evToolsHub
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground ">
          <Link href="/Developer" className="hover:text-primary transition-colors">
            Developer
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>

          {session?.user ? (
            <>
              <span className="flex items-center text-primary font-pixel">
                <UserCircle className="mr-2" />
                {session.user.name?.split(" ")[0] || session.user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/pages/Login" })}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/pages/Login">
              <Button size="sm" variant="outline">
                Login
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2 space-x-4">
          {session?.user && (
            <span className="font-pixel text-blue-500">
              {session.user.name?.split(" ")[0] || session.user.email}
            </span>
          )}

          <ModeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 px-6 pb-4 text-sm font-medium text-muted-foreground">
          <Link href="/pages/Developer" className="hover:text-primary transition-colors">
            Developer
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>

          {session?.user ? (
            <>
              <span className="flex items-center text-primary font-pixel">
                <UserCircle className="mr-2" />
                {session.user.name?.split(" ")[0] || session.user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/Login" })}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/pages/Login">
              <Button size="sm" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
