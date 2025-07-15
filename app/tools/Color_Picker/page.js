"use client";

import { useState } from "react";
import { Copy, MoveLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/app/components/toggle";

// Converters
const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const hexToHSL = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

const generatePalette = (hex) => {
  const base = parseInt(hex.slice(1), 16);
  const palette = [];
  for (let i = 1; i <= 5; i++) {
    let shade = base + i * 1118481;
    let tint = base - i * 1118481;
    shade = `#${Math.min(shade, 0xffffff).toString(16).padStart(6, "0")}`;
    tint = `#${Math.max(tint, 0).toString(16).padStart(6, "0")}`;
    palette.push({ tint, shade });
  }
  return palette;
};

const ColorPicker = () => {
  const [color, setColor] = useState("#1a5151");
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState("hex");
  const [history, setHistory] = useState([]);

  const getFormattedColor = () => {
    if (format === "hex") return color;
    if (format === "rgb") return hexToRGB(color);
    if (format === "hsl") return hexToHSL(color);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedColor());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleColorChange = (val) => {
    setColor(val);
    setHistory((prev) => [val, ...prev.filter((c) => c !== val)].slice(0, 6));
  };

  const palette = generatePalette(color);

  return (
    <div className="min-h-screen p-6 flex justify-center items-center">
      <div className="w-full max-w-4xl dark:bg-white/5 backdrop-blur-sm border dark:border-white/10 p-6 rounded-2xl shadow-xl space-y-6 dark:text-white relative">
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

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-1">🎨 Color Picker</h1>
          <p className="dark:text-gray-400">Select, copy, and generate beautiful color combinations.</p>
        </div>

        {/* Color Picker Input */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-28 h-28 rounded-lg border-4 border-white/20 shadow-inner cursor-pointer transition"
          />

          <div
            className="w-full h-32 rounded-xl transition-all duration-300 border border-white/10"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Format & Copy */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <code className="text-lg bg-black/30 px-4 py-2 rounded-lg border border-white/10">
            {getFormattedColor()}
          </code>
          <Button
            variant="outline"
            onClick={handleCopy}
            className="dark:bg-white/10 dark:hover:bg-white/20  border-black border-white/20 dark:text-white text-sm px-3 py-2 rounded-md border-2 transition-all"
          >
            <Copy className="w-4 h-4 mr-1" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="bg-black/30 border border-white/20 px-3 py-2 rounded-md text-sm"
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
          </select>
        </div>

        {/* Palette */}
        <div>
          <h2 className="text-xl font-semibold mb-3">🌈 Palette</h2>
          <div className="grid grid-cols-5 gap-4">
            {palette.map(({ shade, tint }, i) => (
              <div key={i} className="space-y-2">
                <div
                  className="w-full h-10 rounded-lg border border-white/10"
                  style={{ backgroundColor: shade }}
                  title={shade}
                />
                <div
                  className="w-full h-10 rounded-lg border border-white/10"
                  style={{ backgroundColor: tint }}
                  title={tint}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Colors */}
        <div>
          <h2 className="text-xl font-semibold mb-3">🕘 Recent Colors</h2>
          <div className="flex gap-3 flex-wrap">
            {history.map((c, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer transition-transform hover:scale-110"
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                title={c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
