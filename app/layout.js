import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/themeprovider";
import { Pixelify_Sans, Press_Start_2P } from "next/font/google";
import Footer from "./Footer/page";
import { AuthProvider } from "./utils/provider";
import Image from "next/image";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-press",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "DevToolsHub — Powerful Developer Toolkit",
  description:
    "DevToolsHub is an all-in-one toolkit for developers featuring a color picker, markdown editor, JSON formatter, regex tester, and code beautifier — designed to boost productivity and streamline your workflow.",
  icons: {
    icon: "/images/title.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`bg-[radial-gradient(circle_at_20%_20%,rgba(0,100,255,0.05),transparent)] ${geistSans.variable} ${geistMono.variable} ${pressStart.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
