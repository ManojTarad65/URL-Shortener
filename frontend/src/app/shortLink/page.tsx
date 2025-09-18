// // frontend/pages/index.tsx
// "use client";
// import { useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [url, setUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:8000/shorten", {
//       originalUrl: url,
//     });
//     setShortUrl(res.data.shortUrl);
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-4">🔗 URL Shortener</h1>
//       <form onSubmit={handleSubmit} className="flex space-x-2">
//         <input
//           type="url"
//           placeholder="Enter long URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="px-4 py-2 rounded-lg border  w-80"
//         />
//         <button type="submit" className="bg-blue-500 px-4 py-2 rounded-lg">
//           Shorten
//         </button>
//       </form>
//       {shortUrl && (
//         <p className="mt-4">
//           Short URL:{" "}
//           <a
//             href={shortUrl}
//             target="_blank"
//             className="text-green-400 underline"
//           >
//             {shortUrl}
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }
// frontend/pages/index.tsx
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Check, Copy } from "lucide-react"; // ✅ install lucide-react for icons

// export default function Home() {
//   const [url, setUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [copied, setCopied] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/shorten", {
//         originalUrl: url,
//       });
//       setShortUrl(res.data.shortUrl);
//       setCopied(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(shortUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000); // reset after 2s
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
//       {/* Background blobs */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.3 }}
//         transition={{ duration: 2 }}
//         className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
//       />
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.3 }}
//         transition={{ duration: 2, delay: 0.5 }}
//         className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
//       />

//       {/* Glass Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 w-full max-w-lg p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-lg shadow-2xl"
//       >
//         <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
//           🔗 LinkWarp
//         </h1>
//         <p className="text-neutral-300 text-center mt-3 text-sm md:text-base">
//           Transform your long, messy URLs into sleek, shareable links ✨
//         </p>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col md:flex-row items-center gap-3 mt-8"
//         >
//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="url"
//             placeholder="Paste your long URL here..."
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="w-full flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-neutral-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold shadow-lg hover:shadow-purple-500/40 transition"
//           >
//             Shorten 🚀
//           </motion.button>
//         </form>

//         {/* Short URL Result */}
//         {shortUrl && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mt-6 flex items-center justify-between bg-black/40 border border-white/20 px-4 py-3 rounded-lg"
//           >
//             <a
//               href={shortUrl}
//               target="_blank"
//               className="text-cyan-400 underline hover:text-blue-400 transition truncate max-w-[70%]"
//             >
//               {shortUrl}
//             </a>
//             <button
//               onClick={handleCopy}
//               className="ml-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
//             >
//               {copied ? (
//                 <Check className="text-green-400 w-5 h-5" />
//               ) : (
//                 <Copy className="text-white w-5 h-5" />
//               )}
//             </button>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Footer */}
   
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return <p className="text-white">Not logged in ❌</p>;
  }


  const handleSubmit = async (e: any) => {


    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/shorten", {
        originalUrl: url,
      });
      setShortUrl(res.data.shortUrl);
      setCopied(false);
    } catch (error) {
      console.error("Error:", error);
      toast("⚠️ Please Enter Url", "Please check your backend server.");
    }
  };    

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    toast("✅ Link Copied!", "Your short URL is now in the clipboard.");

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      <div className="text-white">
        <h1>Welcome, {session.user?.name}</h1>
        <p>Email: {session.user?.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-4 p-2 bg-red-500 rounded"
        >
          Logout
        </button>
      </div>
      {/* Background blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
      />

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-lg shadow-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          🔗 LinkWarp
        </h1>
        <p className="text-neutral-300 text-center mt-3 text-sm md:text-base">
          Transform your long, messy URLs into sleek, shareable links ✨
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center gap-3 mt-8"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-neutral-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold shadow-lg hover:shadow-purple-500/40 transition"
          >
            Shorten 🚀
          </motion.button>
        </form>

        {/* Short URL Result */}
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex items-center justify-between bg-black/40 border border-white/20 px-4 py-3 rounded-lg"
          >
            <a
              href={shortUrl}
              target="_blank"
              className="text-cyan-400 underline hover:text-blue-400 transition truncate max-w-[70%]"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="ml-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              {copied ? (
                <Check className="text-green-400 w-5 h-5" />
              ) : (
                <Copy className="text-white w-5 h-5" />
              )}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
