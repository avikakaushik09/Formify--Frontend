"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card max-w-7xl w-full p-12 text-center fade-in">

        {/* LOGO */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-300 to-violet-400 bg-clip-text text-transparent">
          FORMIFY
        </h1>

        {/* TAGLINE */}
        <p className="text-2xl md:text-3xl text-white font-medium mb-3">
          Create custom forms, share them with anyone,
          and collect responses instantly.
        </p>

        <p className="text-gray-400 text-lg mb-10">
          Professional Form Builder • Response Analytics • Secure Authentication
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center items-center gap-14 flex-wrap mb-14 mt-6">

          <button
            onClick={() => router.push("/signup")}
            className="neon-btn px-12 py-5 rounded-2xl font-bold text-xl min-w-[220px]"
          >
            🚀 Get Started
          </button>

          <button
            onClick={() => router.push("/login")}
            className="px-12 py-5 rounded-2xl border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 transition text-xl font-semibold min-w-[220px]"
          >
            Login
          </button>

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8">

          <div className="glass-card p-8 hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">📝</div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Create Forms
            </h3>

            <p className="text-gray-400 text-lg">
              Build beautiful forms with dynamic fields and validation.
            </p>
          </div>

          <div className="glass-card p-8 hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">🔗</div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Share Links
            </h3>

            <p className="text-gray-400 text-lg">
              Instantly share your forms with anyone using a public link.
            </p>
          </div>

          <div className="glass-card p-8 hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">📊</div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Analytics
            </h3>

            <p className="text-gray-400 text-lg">
              Track responses and gain insights through analytics.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}