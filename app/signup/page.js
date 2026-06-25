"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      alert("Registered Successfully!");
      router.push("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="glass-card w-full max-w-md p-10 fade-in">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-300 to-violet-400 bg-clip-text text-transparent mb-3">
            FORMIFY
          </h1>
          <p className="text-gray-400">Create Your Account ✨</p>
          <p className="text-sm text-gray-500 mt-2">Start building forms in minutes</p>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-black/20 border border-purple-500/30 rounded-2xl px-4 py-4 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-black/20 border border-purple-500/30 rounded-2xl px-4 py-4 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black/20 border border-purple-500/30 rounded-2xl px-4 py-4 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="neon-btn w-full py-4 rounded-2xl font-bold"
          >
            Create Account
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">Already have an account?</p>
          <button
            onClick={() => router.push("/login")}
            className="text-pink-400 font-semibold mt-2 hover:text-pink-300"
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}