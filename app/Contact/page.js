"use client";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faCloudflare,
  faFreeCodeCamp,
  faGithub,
  faLinkedinIn,
  faSuperpowers,
} from "@fortawesome/free-brands-svg-icons";
import Successfully from "@/app/utils/mailSucessfull";

const Contact = () => {
  const [copyStatus, setCopyStatus] = useState({ type: "", copied: false });
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [Name, setName] = useState("");
  const [isSent, setisSent] = useState(false);
  const [error, seterror] = useState("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus({ type, copied: true });
      setTimeout(() => setCopyStatus({ type: "", copied: false }), 2000);
    });
  };

  const HandleForm = async (e) => {
    e.preventDefault();

    if (!Name || !Email || !Message) {
      seterror("Please fill in all the fields.");
      return;
    }

    seterror(""); // Clear previous error

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: Name,
        email: Email,
        message: Message,
      }),
    });

    if (res.ok) {
      setisSent(true);
      setName("");
      setEmail("");
      setMessage("");

      // Auto-dismiss the success alert after 3s
      setTimeout(() => setisSent(false), 3000);
    } else {
      seterror("something went wrong try again later ");
    }
  };

  const email = "negisameer72@gmail.com";
  const phone = "+91 9058420228";

  return (
    <section id="contact" className="min-h-screen dark:text-white px-6 py-16 flex items-center justify-center">
      {isSent && <Successfully show={isSent} />}
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Get in Touch
          </h2>
          <p className="mt-4 text-black dark:text-gray-300">
            Have a question, suggestion or collaboration idea? Fill the form or
            reach out directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <MailIcon className="text-green-400 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  Email
                  <button
                  suppressHydrationWarning
                   variant="outline"
                    onClick={() => handleCopy(email, "email")}
                    className="text-gray-400 hover:text-green-400 transition"
                    aria-label="Copy email"
                  >
                    {copyStatus.type === "email" && copyStatus.copied ? (
                      <CheckIcon size={16} />
                    ) : (
                      <CopyIcon size={16} />
                    )}
                  </button>
                </h4>
                <p className="text-black dark:text-gray-400">{email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <PhoneIcon className="text-green-400 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  Phone
                  <button
                    suppressHydrationWarning
                    onClick={() => handleCopy(phone, "phone")}
                    className="text-gray-400 hover:text-green-400 transition"
                    aria-label="Copy phone number"
                  >
                    {copyStatus.type === "phone" && copyStatus.copied ? (
                      <CheckIcon size={16} />
                    ) : (
                      <CopyIcon size={16} />
                    )}
                  </button>
                </h4>
                <p className="text-black dark:text-gray-400">{phone}</p>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPinIcon className="text-green-400 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-black dark:text-gray-400">Dehradun, India</p>
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-4 mt-6 mx-1">
              <Link
                href="https://leetcode.com/u/Codesameer"
                target="_blank"
                className="p-2 border rounded-full text-yellow-400 hover:scale-110 transition"
              >
                <FontAwesomeIcon icon={faFreeCodeCamp} size="lg" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sameer-negi-52a85b336/"
                target="_blank"
                className="p-2 border rounded-full text-blue-500 hover:scale-110 transition"
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </Link>
              <Link
                href="https://github.com/Sameer1311"
                target="_blank"
                className="p-2 border rounded-full dark:text-white hover:scale-110 transition"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6  border-2  border-black  p-2 rounded-md dark:border-none" onSubmit={HandleForm}>
            <input
              type="text"
              placeholder="Your Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Send Message
            </Button>

            {error && (
              <div className="px-4 py-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded-md shadow-sm">
                ⚠️ {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
