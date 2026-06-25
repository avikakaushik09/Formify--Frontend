"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://formify-backend-zkl2.onrender.com/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="glass-card w-full max-w-md p-10 fade-in">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-300 to-violet-400 bg-clip-text text-transparent mb-3">
            FORMIFY
          </h1>
          <p className="text-gray-400">Welcome Back 👋</p>
          <p className="text-sm text-gray-500 mt-2">Login to manage your forms</p>
        </div>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full bg-black/20 border border-purple-500/30 rounded-2xl px-4 py-4 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full bg-black/20 border border-purple-500/30 rounded-2xl px-4 py-4 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="neon-btn w-full py-4 rounded-2xl font-bold"
          >
            Login
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">Don't have an account?</p>
          <button
            onClick={() => router.push("/signup")}
            className="text-pink-400 font-semibold mt-2 hover:text-pink-300"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}