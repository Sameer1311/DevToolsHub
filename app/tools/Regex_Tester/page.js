"use client";

import React, { useState } from "react";
import { TextSearch, RefreshCcw, SearchCheck, MoveLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/toggle";
import Link from "next/link";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [flags, setFlags] = useState("g");

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const result = [...testString.matchAll(regex)];
      setMatches(result);
      setError("");
    } catch (e) {
      setError("❌ Invalid regex pattern");
      setMatches([]);
    }
  };

  const clearAll = () => {
    setPattern("");
    setTestString("");
    setMatches([]);
    setError("");
  };

  return (
    <div className="min-h-screen  px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-3 md:text-3xl text-2xl font-extrabold  ">
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
          <SearchCheck size={30} />
          Regex Tester
        </div>
        <p className="text-sm dark:text-gray-400 mt-3">
          Test and visualize your regex patterns in real time
        </p>
      </div>

      {/* Input Panel */}
      <div className="grid md:grid-cols-2 gap-6 gap-y-4">
        {/* Regex Pattern */}
        <div className="dark:bg-gray-800 rounded-2xl border-2 shadow-lg p-4 space-y-3">
          <label className="text-lg font-semibold">Regex Pattern</label>
          <input
            type="text"
            placeholder="e.g. \\b\\w{4,}\\b"
            className="w-full p-2  border-2 border-black rounded-md  dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />

          <label className="text-sm font-medium my-3  mt-4">Flags (e.g. g, i, m)</label>
          <input
            type="text"
            placeholder="gim"
            className="w-full p-2   border-2 border-black rounded-md  dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>

        {/* Test String */}
        <div className="dark:bg-gray-800   border-2 rounded-md shadow-lg p-4 space-y-3">
          <label className="text-lg font-semibold">Test String</label>
          <textarea
            placeholder="Type or paste your test string here..."
            rows={6}
            className="w-full p-2  border-2 border-black rounded-md  dark:bg-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Button
          onClick={testRegex}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white px-6 py-2 rounded-xl shadow-md"
        >
          Test Regex
        </Button>
        <Button
          onClick={clearAll}
          variant="outline"
          className="border-gray-600 dark:hover:bg-gray-700  px-6 py-2 rounded-xl"
        >
          <RefreshCcw className="mr-2" size={18} />
          Clear
        </Button>
      </div>

      {/* Results */}
      <div className="dark:bg-gray-800 rounded-2xl shadow-lg p-4 space-y-2">
        <label className="text-lg font-semibold">Result</label>
        {error && <div className="text-red-400">{error}</div>}

        {!error && matches.length === 0 && (
          <div className="">No matches found</div>
        )}

        {!error && matches.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              Found {matches.length} match{matches.length > 1 ? "es" : ""}:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              {matches.map((match, i) => (
                <li key={i}>
                  <code className="text-green-400 font-mono bg-gray-900 px-1 py-0.5 rounded">
                    {match[0]}
                  </code>{" "}
                  <span className="text-sm text-gray-400">
                    at index {match.index}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegexTester;
