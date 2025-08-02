"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SubdomainRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nik: "",
    username: "",
    full_name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(formData);
      alert("Registered!");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-white via-[#C0B099] to-[#C0B099] overflow-hidden min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="sm:flex sm:flex-row justify-center py-6 lg:py-[80px] z-10 relative w-full max-w-7xl mx-auto px-4"
      >
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md text-gray-300 hidden lg:flex"
        >
          <h1 className="my-3 font-semibold text-4xl text-black">
            Create Account
          </h1>
          <p className="pr-3 text-sm opacity-75 text-black">
            Fill in the details below to create your account and join our
            community.
          </p>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center self-center z-10"
        >
          <div className="p-8 w-full max-w-2xl bg-white mx-auto rounded-3xl shadow-lg">
            <div className="mb-6">
              <h3 className="font-semibold text-2xl text-gray-800">Register</h3>
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                  Sign In
                </a>
              </p>
            </div>

            <div className="space-y-4">
              {/* Flex container for form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nik"
                  placeholder="NIK (16 digits)"
                  maxLength={16}
                  value={formData.nik}
                  onChange={handleChange}
                  required
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C0B099] transition-all"
                />

                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C0B099] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C0B099] transition-all"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C0B099] transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-800 px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C0B099] transition-all"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                  className="h-4 w-4 text-primary focus:ring-[#C0B099] border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="agree"
                  className="text-sm text-gray-700 select-none"
                >
                  Saya setuju dengan{" "}
                  <a href="/terms" className="text-primary underline">
                    syarat & ketentuan
                  </a>
                </label>
              </div>

              <motion.button
                type="submit"
                onClick={handleRegister}
                whileHover={!isLoading ? { scale: 1.03 } : {}}
                whileTap={!isLoading ? { scale: 0.97 } : {}}
                disabled={isLoading || !isAgreed}
                className={`w-full flex justify-center items-center mt-6 ${
                  isLoading || !isAgreed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-blue-500"
                } text-white p-3 rounded-lg tracking-wide font-semibold transition-colors duration-300`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : null}
                {isLoading ? "Registering..." : "Register"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Wave Section */}
      <div className="absolute bottom-0 left-0 w-full h-80 overflow-hidden">
        {/* Enhanced Wave SVG with Brown Theme */}
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="brownWaveGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D2B48C" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#DEB887" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5DEB3" stopOpacity="1" />
            </linearGradient>
            <linearGradient
              id="brownWaveGradient2"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E6D3B1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F5E6D3" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* First Wave Layer */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            fill="url(#brownWaveGradient)"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />

          {/* Second Wave Layer for depth */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
            fill="url(#brownWaveGradient2)"
            d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,160C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />

          {/* Third Wave Layer - lightest */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeOut", delay: 1 }}
            fill="#F5E6D3"
            fillOpacity="0.6"
            d="M0,256L48,240C96,224,192,192,288,202.7C384,213,480,267,576,272C672,277,768,235,864,224C960,213,1056,235,1152,250.7C1248,267,1344,277,1392,282.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
}
