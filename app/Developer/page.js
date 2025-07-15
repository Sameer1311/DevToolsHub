"use client";

import { ModeToggle } from "@/app/components/toggle";
import { Button } from "@/components/ui/button";
import {
    CodeXml,
  Github,
  Linkedin,
  Mail,
  MoveLeft,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Optional if using animation

const AboutDeveloper = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-16  relative overflow-hidden">
      {/* Back + Toggle */}
      <div className="absolute top-6 left-4 flex flex-col md:flex-row items-center space-x-0 md:space-x-2 space-y-2 md:space-y-0">
        <Link href="/">
          <Button className="rounded-full">
            <MoveLeft />
          </Button>
        </Link>
        <ModeToggle />
      </div>

      {/* Gradient Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
        🚀 About the Developer
      </h1>

      {/* Avatar + Name + Role */}
      <div className="flex flex-col items-center mt-8 space-y-3">
        <div className="rounded-full overflow-hidden border-4 border-pink-500 shadow-xl w-32 h-32 hover:scale-105 hover:shadow-pink-500 transition-all duration-300">
          <Image
            src="/images/Sameer.jpg"
            alt="Developer Avatar"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-2xl font-semibold mt-4">Sameer Negi</h2>
        <p className="text-pink-400 text-sm font-medium">
          Full Stack Developer
        </p>
        <Link href="https://sameer106.netlify.app/">
            <Button variant="outline" className="font-bold">Visit</Button>
        </Link>
      </div>

      {/* Bio */}
      <div className="max-w-2xl text-center mt-6 dark:text-gray-300 text-sm md:text-base leading-relaxed font-sans px-4">
        Passionate about building fast, scalable, and beautiful web applications.
        Experienced in crafting full-stack products using modern JavaScript
        frameworks and 3D visualizations with React Three Fiber.
      </div>

      {/* Skill Badges */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "JavaScript",
          "React",
          "Next.js",
          "Node.js",
          "Tailwind",
          "MongoDB",
          "WebRTC",
          "Socket.IO",
        ].map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 font-bold text-sm rounded-full border-2 border-gray-700 hover:border-pink-500 hover:shadow-lg hover:scale-105 transition-all"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex gap-6 mt-10">
        <Link href="https://github.com/Sameer1311" target="_blank">
          <Github className="w-6 h-6 dark:text-gray-300 hover:text-pink-500 transition" />
        </Link>
        <Link href="https://linkedin.com/in/sameer-negi-52a85b336" target="_blank">
          <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-300 hover:text-blue-500 transition" />
        </Link>
        <Link href="negisameer72@gmail.com" target="_blank">
          <Mail className="w-6 h-6 text-green-600 dark:text-green-300 hover:text-green-500 transition" />
        </Link>
        <Link href="https://leetcode.com/u/Codesameer" target="_blank">
          <CodeXml className="w-6 h-6 text-orange-600 dark:text-orange-300 hover:text-orange-500 transition" />
        </Link>
      </div>

      {/* Signature */}
      <div className="mt-12 flex items-center gap-2 text-sm text-gray-500">
        <Sparkles className="text-yellow-400" size={16} />
        Code is like a book — if {"it's"} well written, anyone can read it.
      </div>
    </div>
     </motion.div>
  );
};

export default AboutDeveloper;
