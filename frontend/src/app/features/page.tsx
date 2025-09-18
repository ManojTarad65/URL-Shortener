
"use client";

import { motion } from "framer-motion";
import { Rocket, Shield, Zap } from "lucide-react"; // icons

const features = [
  {
    title: "⚡ Super Fast",
    desc: "Experience blazing fast performance with optimized code and caching.",
    icon: <Zap className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "🔒 Secure Authentication",
    desc: "Your data is safe with advanced encryption and JWT-based login.",
    icon: <Shield className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "🚀 Scalable",
    desc: "Easily scale your app to handle thousands of users without downtime.",
    icon: <Rocket className="w-8 h-8 text-green-500" />,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center mb-16"
      >
        Our <span className="text-purple-500">Features</span>
      </motion.h1>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition"
          >
            <div className="mb-6">{f.icon}</div>
            <h2 className="text-2xl font-bold mb-4">{f.title}</h2>
            <p className="text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
