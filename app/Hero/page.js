"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  faLinkedinIn,
  faCloudflare,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Palette, FileText, Code, Terminal, Lock, Ruler } from "lucide-react";
import Link from "next/link"; // Optional for clickable cards
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hero = () => {
  const DeveloperTools = [
    { title: "Color Picker", desc: "Choose and copy color", icon: <Palette /> ,link:"/tools/Color_Picker" },
    { title: "Regex Tester", desc: "Test regular expressions", icon: <Code /> ,link:"/tools/Regex_Tester" },
    {
      title: "Markdown Editor",
      desc: "Edit and preview markdown",
      icon: <FileText />,
      link:"/tools/Markdown_Editor"
    },
    {
      title: "JSON Formatter",
      desc: "Format and validate JSO" ,link:"/tools/JSON_formatter",
      icon: <Terminal />,
    },
    
  ];
  
const MondoDbUri = process.env.NEXTAUTH_URL
console.log(MondoDbUri)

  return (
    <section className="w-screen h-full md:h-screen  text-foreground relative overflow-hidden md:m-0 mt-3">
      {/* Background Accent (optional SVG or gradient blob) */}
      <div className="absolute top-0 left-0 w-full h-full  pointer-events-none z-0" />

      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6"
      >
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-6"
        >
          <h1 className="text-2xl text-center md:text-5xl font-pixel text-primary group relative overflow-hidden">
            <motion.span className="inline-block group-hover:translate-x-2 transition-all duration-300">
              Dev
            </motion.span>
            <motion.span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-300">
              ToolsHub
            </motion.span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-md">
            All-in-one toolbox for developers. Run, debug, and convert without
            switching tabs. <br/>
            <b>Build For developers ...Build by developer</b>
          </p>

          <div className="flex  items-center justify-start mx-2 space-x-4 text-primary text-2xl hover:cursor-pointer">
            <Link href="https://www.linkedin.com/in/sameer-negi-52a85b336/">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="hover:scale-110 transition"
              />
            </Link>
            <Link href="https://github.com/Sameer1311">
              <FontAwesomeIcon
                icon={faCloudflare}
                className="hover:scale-110 transition"
              />
            </Link>
            <Link href="https://leetcode.com/u/Codesameer">
              <FontAwesomeIcon
                icon={faGithub}
                className="hover:scale-110 transition"
              />
            </Link>
          </div><div className="flex gap-4">
  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
    <Link href="/ToolsPage">
    <Button variant="outline" className="bg-background text-foreground rounded-md hover:opacity-90">
      🛠 Explore Tools
    </Button>
    </Link>
  
  </div>
</div>

        </motion.div>

        {/* Right Side: Tool Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className=" md:p-2  md:mx-5 w-full md:w-1/2 grid md:grid-cols-2 grid-cols-1 gap-4 py-3"
        >
          {DeveloperTools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.link}
              className="group"
            >
              <div className="flex flex-col items-start gap-2 p-4 bg-card border rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <div className="text-primary">{tool.icon}</div>
                <h2 className="text-md font-semibold">{tool.title}</h2>
                <p className="text-sm text-muted-foreground">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
