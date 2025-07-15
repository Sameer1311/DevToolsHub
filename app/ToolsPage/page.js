"use client";

import Link from "next/link";
import {
  Wrench,
  Code,
  Palette,
  FileText,
  SearchCheck,
  ClipboardList,
  ArrowRight,
  MoveLeftIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/toggle";

const tools = [
  {
    name: "Color Picker",
    icon: <Palette className="w-6 h-6 text-pink-500" />,
    desc: "Pick and copy colors with ease.",
    slug: "Color_Picker",
    category: "UI",
    footer: "Great for UI designers",
  },
  {
    name: "Regex Tester",
    icon: <SearchCheck className="w-6 h-6 text-indigo-500" />,
    desc: "Test and validate regular expressions.",
    slug: "Regex_Tester",
    category: "Logic",
    footer: "Test regex on the fly",
  },
  {
    name: "Markdown Editor",
    icon: <FileText className="w-6 h-6 text-green-500" />,
    desc: "Write, edit and preview markdown files.",
    slug: "Markdown_Editor",
    category: "Editor",
    footer: "For docs & notes",
  },
  {
    name: "JSON Formatter",
    icon: <ClipboardList className="w-6 h-6 text-yellow-500" />,
    desc: "Format and validate your JSON easily.",
    slug: "JSON_formatter",
    category: "Formatter",
    footer: "Debug structured data",
  },
  {
    name: "Code Beautifier",
    icon: <Code className="w-6 h-6 text-blue-500" />,
    desc: "Make messy code readable and clean.",
    slug: "Code_Beautifier",
    category: "Formatter",
    footer: "Supports JS, HTML, CSS",
  },
  {
    name: "Toolbox",
    icon: <Wrench className="w-6 h-6 text-red-500" />,
    desc: "More developer utilities coming soon!",
    slug: "coming-soon",
    category: "Utility",
    footer: "Stay tuned 👀",
  },
];

const ToolPage = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header + Back */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-fit flex item-center justify-center space-x-3">
                        <Link href="/">
                          <Button
                            variant="outline"
                            className=" dark:text-white hover:bg-white/10"
                          > 
                            <MoveLeftIcon className="w-5 h-5 mr-1" /> Back
                          </Button>
                        </Link>
                        <ModeToggle/>
                        </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-center flex-1">
            🛠 Explore Developer Tools
          </h1>
          <div className="w-10" /> {/* Spacer to balance the back icon */}
        </div>

        <p className="text-center dark:text-gray-400 max-w-2xl mx-auto">
          A curated collection of helpful tools built for developers, designers, and creators.
        </p>

        {/* Tool count */}
        <div className="text-sm dark:text-gray-400 text-center">
          Total Tools:{" "}
          <span className=" font-medium">{tools.length}</span>
        </div>

        {/* Tool Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="relative dark:bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="dark:bg-gray-800 p-2 rounded-full">{tool.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold group-hover:text-pink-500 transition">
                    {tool.name}
                  </h2>
                  <span className="text-xs dark:text-gray-400 mt-1 block">
                    {tool.category}
                  </span>
                </div>
              </div>

              <p className="text-sm dark:text-gray-300 mb-4">{tool.desc}</p>

              <div className="flex items-center justify-between border-t border-gray-700 pt-3 text-xs text-gray-500">
                <span>{tool.footer}</span>
                <Link href={`/tools/${tool.slug}`}>
                  <ArrowRight className="w-4 h-4 hover:text-white transition" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-500 mt-10">
          Want to suggest a new tool?{" "}
          <Link href="/pages/Contact">
            <span className="underline hover:text-white transition cursor-pointer">
              Click here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
