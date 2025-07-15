"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, MoveLeft } from "lucide-react";
import Link from "next/link";
import  { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setErrors("User already exists.");
        return;
      }

      const res = await fetch("/api/userRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        setName("")
        setEmail("")
        setPassword("")
      console.log("form reset done ")
        const form = e.target;
        form.reset();
        router.push("/Login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center text-white px-6 py-10">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-8 space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <MoveLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            DevsToolHub Register
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 bg-gray-800 border ${
                errors.name ? "border-red-500" : "border-gray-700"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 bg-gray-800 border ${
                errors.email ? "border-red-500" : "border-gray-700"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 bg-gray-800 border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-2 text-gray-400 hover:text-white"
              >
                {showPwd ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-600 hover:to-green-400 text-white font-semibold rounded-lg transition duration-300"
          >
            Register
          </Button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="text-blue-400 hover:text-blue-600 underline"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
