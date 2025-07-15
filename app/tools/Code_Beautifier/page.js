"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, DownloadIcon, SparklesIcon } from "lucide-react";
import { ModeToggle } from "@/app/components/toggle";

// Dynamically import AceEditor to prevent SSR issues
const AceEditor = dynamic(() => import("react-ace"), { ssr: false });

const CodeBeautifier = () => {
  const [code, setCode] = useState("// Write your JS code here");

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("ace-builds/src-noconflict/ace").then(() => {
        import("ace-builds/src-noconflict/ext-language_tools");
        import("ace-builds/src-noconflict/mode-javascript");
        import("ace-builds/src-noconflict/theme-tomorrow_night");
      });
    }
  }, []);

const handleBeautify = async () => {
  try {
    const prettier = (await import("prettier/standalone")).default;
    const parserBabel = (await import("prettier/plugins/babel")).default;
    const pluginEstree = (await import("prettier/plugins/estree")).default;

    const formatted = await prettier.format(String(code), {
      parser: "babel",
      plugins: [parserBabel, pluginEstree],
      semi: true,
      singleQuote: true,
    });

    setCode(String(formatted));
  } catch (error) {
    console.error("Prettier Error:", error);
    alert("Error formatting code. Make sure it's valid JavaScript.");
  }
};

  const handleDownload = () => {
    const blob = new Blob([String(code)], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "beautified-code.js";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full p-4 relative">
      {/* Back Button */}
      <Link href="/ToolsPage">
        <Button
          variant="ghost"
          className="absolute top-4 left-4 dark:text-white hover:bg-white/10"
        >
          <MoveLeftIcon className="w-5 h-5 mr-1" /> Back
        </Button>
      </Link>
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Code Beautifier</h1>
    <ModeToggle/>

      {/* Editor */}
      <div className="w-full max-w-5xl mx-auto border bg-white dark:bg-slate-700 border-white/10 rounded-xl overflow-hidden">
        <AceEditor
          mode="javascript"
          theme="tomorrow_night"
          name="code-editor"
          value={code}
          onChange={(val) => setCode(val)}
          width="100%"
          height="400px"
          fontSize={16}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <Button onClick={handleBeautify} className="bg-green-600 hover:bg-green-700">
          <SparklesIcon className="w-4 h-4 mr-2" /> Beautify
        </Button>
        <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
          <DownloadIcon className="w-4 h-4 mr-2" /> Download
        </Button>
      </div>
    </div>
  );
};

export default CodeBeautifier;
