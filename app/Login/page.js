"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, MoveLeft } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";


const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState({ email: "", password: "", global: "" });

  const validate = () => {
    const newErr = { email: "", password: "", global: "" };

    if (!email.trim()) newErr.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErr.email = "Email is invalid.";

    if (!password.trim()) newErr.password = "Password is required.";
    else if (password.length < 6)
      newErr.password = "Password must be at least 6 characters.";

    return newErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setError(newErrors);

    // Check for field errors
    if (newErrors.email || newErrors.password) return;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError({ ...newErrors, global: "Invalid credentials" });
        return;
      }

      router.replace("/"); // ✅ Replace with your route
    } catch (err) {
      setError({ ...newErrors, global: "Something went wrong." });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-white px-6 py-10">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8 space-x-5">
          <Link href="/">
            <Button variant="ghost">
              <MoveLeft />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            DevsToolHub Login
          </h2>
        </div>

        {error.global && (
          <div className="mb-4 text-red-500 font-medium text-sm text-center">
            {error.global}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 bg-gray-800 border ${
                error.email ? "border-red-500" : "border-gray-700"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                className={`w-full px-4 py-2 bg-gray-800 border ${
                  error.password ? "border-red-500" : "border-gray-700"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-400 hover:text-white"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-600 hover:to-green-500 text-white font-semibold rounded-lg transition duration-300"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/RegisterPage"
            className="text-blue-400 hover:text-blue-600 underline"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
