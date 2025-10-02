"use client";

import { motion } from "framer-motion";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center mb-16"
      >
        About <span className="text-purple-500">Us</span>
      </motion.h1>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Who We Are 🚀</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Every great app starts with a passion for problem-solving. We&apos;re a
            innovators who believe in crafting web solutions that are not only
            beautiful but also built to last.{" "}
            <span className="text-purple-400 font-semibold">
              By combining the agility of Next.js with the backend power of
              Node.js and the flexibility of MongoDB
            </span>
            , we build applications that are as secure and fast as they are
            enjoyable to use.Our goal is to make the web a more user-friendly
            place, one project at a time.
          </p>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://cdn.dribbble.com/userupload/23050102/file/original-db00c5c9e74c7173675878fbee36e176.png?resize=600x0"
            alt="About illustration"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg shadow-purple-500/20"
          />
        </motion.div>
      </div>
    </div>
  );
}
