"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col">
    

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-extrabold leading-tight mb-4">
            Shorten Links <span className="text-blue-500">Like a Pro</span>
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Transform long URLs into elegant, shareable links. The simple
            solution for a cleaner web experience.
          </p>
          <Link href={session ? "/shortLink" : "/login"}>
            <button className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-lg font-semibold shadow-lg shadow-blue-500/30">
              Try It Now
            </button>
          </Link>
        </motion.div>

        {/* Right Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-10 md:mt-0"
        >
          <div className="w-[400px] h-[400px] rounded-3xl flex items-center justify-center shadow-lg shadow-purple-600/40 bg-gray-900">
           <img src="pic.png" alt="" />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 LinkWarp. All rights reserved.
      </footer>
    </div>
  );
}
