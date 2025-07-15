"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faFreeCodeCamp,
} from "@fortawesome/free-brands-svg-icons";
import {
  HomeIcon,
  ToolCase,
  Circle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-pixel text-primary">DevToolsHub 🚀</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Built for devs. With devs. By devs.
          </p>
          <div className="mt-4">
            <Link href="/Developer">
              <Button variant="destructive" className="border-2 dark:border-white ">👨‍💻 Developer</Button>
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-4 text-sm place-items-center md:place-items-start">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition">
            <HomeIcon className="w-4 h-4" />
            Home
          </Link>
          <Link href="/tools" className="flex items-center gap-2 hover:text-primary transition">
            <ToolCase className="w-4 h-4" />
            Tools
          </Link>
          <Link href="#about" className="flex items-center gap-2 hover:text-primary transition">
            <Circle className="w-4 h-4" />
            About
          </Link>
          <Link href="/Contact" className="flex items-center gap-2 hover:text-primary transition">
            <Phone className="w-4 h-4" />
            Contact
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-end items-center space-x-6 text-xl text-muted-foreground">
          <Link href="https://github.com/Sameer1311" target="_blank" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} className="hover:text-foreground transition" />
          </Link>
          <Link href="https://www.linkedin.com/in/sameer-negi-52a85b336/" target="_blank" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} className="hover:text-blue-500 transition" />
          </Link>
          <Link href="https://www.freecodecamp.org/sameer" target="_blank" aria-label="FreeCodeCamp">
            <FontAwesomeIcon icon={faFreeCodeCamp} className="hover:text-green-500 transition" />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-xs text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} DevToolsHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
