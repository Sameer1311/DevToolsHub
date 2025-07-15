"use client";

import React, { useState } from "react";
import AceEditor from "react-ace";
import { Download, FileText, MoveLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import { ModeToggle } from "@/app/components/toggle";
import Link from "next/link";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormatted(pretty);
    } catch (error) {
      setFormatted("❌ Invalid JSON");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="w-full flex items-center gap-2 text-2xl font-bold">
      <div className="w-fit flex item-center justify-center space-x-3">
              <Link href="/ToolsPage">
                <Button
                  variant="outline"
                  className=" dark:text-white hover:bg-white/10"
                > 
                  <MoveLeftIcon className="w-5 h-5 mr-1" /> Back
                </Button>
              </Link>
              <ModeToggle/>
              </div>
        <FileText size={28} />
        <span>JSON Formatter</span>
      </div>

      {/* Input Editor */}
      <div className="space-y-2">
        <label className="text-lg font-semibold">Input JSON</label>
        <AceEditor
        className="bg-white dark:bg-black border-2 rounded-md text-black dark:text-white"
          mode="json"
          theme="twilight"
          onChange={(val) => setInput(val)}
          name="input_editor"
          value={input}
          fontSize={14}
          width="100%"
          height="250px"
          setOptions={{ useWorker: false }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button onClick={formatJSON} className="bg-green-600 hover:bg-green-700">
          Beautify
        </Button>
        <Button onClick={handleDownload} variant="outline">
          <Download className="mr-2" size={18} />
          Download
        </Button>
      </div>

      {/* Output Editor */}
      <div className="space-y-2">
        <label className="text-lg font-semibold">Formatted Output</label>
        <AceEditor
          className="bg-white dark:bg-black border-2 rounded-md text-black dark:text-white"
          mode="json"
          theme="twilight"
          name="output_editor"
          value={formatted}
          readOnly
          fontSize={14}
          width="100%"
          height="250px"
          setOptions={{ useWorker: false }}
        />
      </div>
    </div>
  );
};

export default JsonFormatter;
