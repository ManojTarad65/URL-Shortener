

// "use client";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const Register = () => {
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
// const router = useRouter();

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/register",
//       form
//     );
//     alert(res.data.message);
//     router.push("/shortLink"); // 👈 redirect after success
//   } catch (err: any) {
//     alert(err.response?.data?.message || "Registration failed");
//   }
// };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md mx-auto mt-13 rounded-2xl p-6 md:p-10 border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: -15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-2xl md:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
//         >
//           Welcome to LinkWarp 🚀
//         </motion.h2>

//         <p className="text-neutral-400 text-center text-sm mt-2">
//           Please provide all the necessary information
//         </p>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//             <div className="flex flex-col w-full">
//               <Label htmlFor="firstname" className="mb-2 text-neutral-300">
//                 First Name
//               </Label>
//               <Input
//                 id="firstname"
//                 placeholder="Enter your first name"
//                 type="text"
//                 name="firstname"
//                 value={form.firstname}
//                 onChange={(e) => setForm({ ...form, firstname: e.target.value })}
//                 className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
//               />
//             </div>

//             <div className="flex flex-col w-full">
//               <Label htmlFor="lastname" className="mb-2 text-neutral-300">
//                 Last Name
//               </Label>
//               <Input
//                 id="lastname"
//                 placeholder="Enter your last name"
//                 type="text"
//                 name="lastname"
//                 value={form.lastname}
//                 onChange={(e) => setForm({ ...form, lastname: e.target.value })}
//                 className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
//               />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="email" className="mb-2 text-neutral-300">
//               Email Address
//             </Label>
//             <Input
//               id="email"
//               placeholder="Enter your email address"
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
//             />
//           </div>

//           <div>
//             <Label htmlFor="password" className="mb-2 text-neutral-300">
//               Password
//             </Label>
//             <Input
//               id="password"
//               placeholder="Enter your password"
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
//             />
//           </div>

//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             className="relative w-full h-11 rounded-md font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
//           >
//             Sign up →
//           </motion.button>

//           <p className="text-neutral-400 text-sm text-center mt-4">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="text-purple-400 hover:text-pink-500 transition-colors"
//             >
//               Login
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

// 

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState(""); // OTP state
  const [step, setStep] = useState<"register" | "otp">("register"); // step tracker
  const router = useRouter();

  // Step 1 → Register + send OTP
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      alert(res.data.message); // "User registered. OTP sent to email."
      setStep("otp"); // move to OTP step
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Step 2 → Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: form.email,
          otp,
        }
      );
      alert(res.data.message); // "OTP verified successfully"
      router.push("/shortLink"); // ✅ redirect after OTP success
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto mt-13 rounded-2xl p-6 md:p-10 border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl"
      >
        {step === "register" && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Welcome to LinkWarp 🚀
            </motion.h2>

            <p className="text-neutral-400 text-center text-sm mt-2">
              Please provide all the necessary information
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex flex-col w-full">
                  <Label htmlFor="firstname" className="mb-2 text-neutral-300">
                    First Name
                  </Label>
                  <Input
                    id="firstname"
                    placeholder="Enter your first name"
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={(e) =>
                      setForm({ ...form, firstname: e.target.value })
                    }
                    className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <Label htmlFor="lastname" className="mb-2 text-neutral-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastname"
                    placeholder="Enter your last name"
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={(e) =>
                      setForm({ ...form, lastname: e.target.value })
                    }
                    className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 text-neutral-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
                />
              </div>

              <div>
                <Label htmlFor="password" className="mb-2 text-neutral-300">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full h-11 rounded-md font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
              >
                Sign up →
              </motion.button>

              <p className="text-neutral-400 text-sm text-center mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-400 hover:text-pink-500 transition-colors"
                >
                  Login
                </Link>
              </p>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl font-bold text-center text-white">
              Verify OTP 🔑
            </h2>
            <p className="text-neutral-400 text-center text-sm mt-2">
              We have sent a 6-digit OTP to your email.
            </p>

            <form className="mt-6 space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <Label htmlFor="otp" className="mb-2 text-neutral-300">
                  Enter OTP
                </Label>
                <Input
                  id="otp"
                  placeholder="Enter your OTP"
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 text-center tracking-widest"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full h-11 rounded-md font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                Verify OTP →
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
