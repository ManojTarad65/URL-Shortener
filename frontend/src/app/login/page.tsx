

// "use client";

// import { signIn } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";
// import { motion } from "framer-motion";

// const Login = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md mx-auto rounded-2xl p-6 md:p-10 border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: -15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-2xl md:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
//         >
//           Welcome Back 👋
//         </motion.h2>

//         <p className="text-neutral-400 text-center text-sm mt-2">
//           Login with your Google account
//         </p>

//         {/* Google Login Button */}
//         <motion.button
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={() => signIn("google", { callbackUrl: "/shortlink" })}
//           className="flex items-center justify-center w-full h-11 mt-6 rounded-md font-medium text-white bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
//         >
//           <FcGoogle className="w-6 h-6 mr-2" />
//           Sign in with Google
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={() => signIn("google", { callbackUrl: "/shortlink" })}
        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded"
      >
        <FcGoogle className="mr-2" /> Sign in with Google
      </button>
    </div>
  );
}
