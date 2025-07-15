"use client";

import {
  FileText,
  Bold,
  Italic,
  Code,
  Link2,
  Heading1,
  Download,
  Minus,
  MoveLeftIcon,
} from "lucide-react";
import React, { useState } from "react";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/toggle";
import Link from "next/link"
const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  // Live conversion of custom symbols
  const handleChange = (e) => {
    const value = e.target.value;
    const processed = value
      .split("\n")
      .map((line) => {
        if (/^\*\*\s?/.test(line)) return line.replace(/^\*\*\s?/, "# ");
        if (/^\+\+\s?/.test(line)) return line.replace(/^\+\+\s?/, "## ");
        if (/^--\s?/.test(line)) return line.replace(/^--\s?/, "### ");
        if (/^\*\*\*\s*$/.test(line)) return "---";
        if (/^:::\s?/.test(line)) return line.replace(/^:::\s?/, "> ");
        return line;
      })
      .join("\n");

    setMarkdown(processed);
  };

  // Tab key support
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = markdown;

      const newValue = value.substring(0, start) + "  " + value.substring(end);
      setMarkdown(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Insert markdown syntax
  const insert = (syntax) => {
    const map = {
      bold: "**bold**",
      italic: "_italic_",
      heading: "# Heading",
      code: "`code`",
      link: "[link](https://)",
      line: "\n---\n",
    };

    const textarea = document.getElementById("markdown-area");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const insertText = map[syntax];

    const newText =
      markdown.substring(0, start) + insertText + markdown.substring(end);
    setMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + insertText.length;
    }, 0);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markdown.md";
    a.click();
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-center space-x-3 mb-6">
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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-pixel">
          Markdown Editor
        </h1>
        <FileText className="text-green-500" width={24} />
      </div>

      {/* Toolbar */}
      <div className="w-full max-w-6xl flex flex-wrap gap-3 justify-center mb-6">
        <Button variant="outline" onClick={() => insert("bold")} title="Bold">
          <Bold className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="outline"
          onClick={() => insert("italic")}
          title="Italic"
        >
          <Italic className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="outline"
          onClick={() => insert("heading")}
          title="Heading"
        >
          <Heading1 className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button variant="outline" onClick={() => insert("code")} title="Code">
          <Code className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button variant="outline" onClick={() => insert("link")} title="Link">
          <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="outline"
          onClick={() => insert("line")}
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="outline"
          onClick={handleDownload}
          title="Download Markdown"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <textarea
          id="markdown-area"
          value={markdown}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="h-[50vh] sm:h-[60vh] md:h-[70vh] w-full p-4 border border-gray-300 dark:border-gray-700  text-black dark:text-white rounded-lg resize-none shadow-sm font-mono text-sm sm:text-base"
          placeholder="Start writing your stuff ..."
        />

        <div
          className="h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-auto p-4 border border-gray-300 dark:bg-slate-200 rounded-lg  shadow-sm transition-all prose dark:prose-invert prose-headings:text-xl prose-p:text-base prose-a:text-blue-600 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>

      {/* Tips Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-gray-100 dark:bg-[#1b1b1b] border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold mb-2 text-green-600">
          ✨ Tips & Shortcuts
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <code>** Your Heading</code> → Converts to <code># Heading</code>
          </li>
          <li>
            <code>++ Subheading</code> → Converts to <code>## Subheading</code>
          </li>
          <li>
            <code>-- Smaller Heading</code> → Converts to{" "}
            <code>### Smaller Heading</code>
          </li>
          <li>
            <code>***</code> on a new line → Inserts horizontal rule{" "}
            <code>---</code>
          </li>
          <li>
            <code>::: Quote</code> → Converts to blockquote{" "}
            <code>&gt; Quote</code>
          </li>
          <li>Use the toolbar for bold, italic, links, code, line, etc.</li>
          <li>
            Press <kbd>Tab</kbd> to insert spaces (instead of changing focus)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MarkdownEditor;
