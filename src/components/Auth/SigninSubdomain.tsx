"use client";

import { useState, SyntheticEvent } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation"; // untuk melakukan redirect
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

interface loginProps {
  desaId: number;
  nama_desa: string;
}

export default function SubdomainLogin({ desaId, nama_desa }: loginProps) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const singInData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        subdomainDesaId: desaId,
        redirect: false,
      });
      const response = await axios.post("/api/login", {
        email: data.email,
        password: data.password,
        subdomaindesaId: desaId,
      });

      if (response.status === 200 && response.data) {
        const DesaId = response.data.user.desa_id;
        if (DesaId === desaId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Login Success to " + (nama_desa || "the Village"),
            showConfirmButton: false,
            timer: 1500,
          });
          setIsLoading(false);
          router.push("/admindesa");
        } else if (DesaId === null) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/adminkab");
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Not Authorized for this Village",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsLoading(false);
          return;
        }
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Login Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-white via-[#C0B099] to-[#C0B099] overflow-hidden min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="sm:flex sm:flex-row justify-center py-6 lg:py-[100px] z-10 relative"
      >
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md text-gray-300 hidden lg:flex"
        >
          <h1 className="my-3 font-semibold text-4xl text-black">
            Welcome back
          </h1>
          <p className="pr-3 text-sm opacity-75 text-black">
            Silakan masuk menggunakan akun yang terdaftar pada desa{" "}
            <span className="font-bold">{nama_desa || "Anda"}</span>. Masukkan
            email dan password Anda untuk mengakses dashboard administrasi desa.
          </p>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center self-center  z-10"
        >
          <div className="p-10 w-96 bg-white mx-auto rounded-3xl shadow-lg">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  type="email"
                  placeholder="Email"
                  className="w-full text-sm px-4 py-3 bg-gray-200 text-gray-800 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="Password"
                  className="w-full text-sm text-gray-800 px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>

              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-full bg-gray-200"></span>
              </div>

              <motion.button
                type="submit"
                className="w-full flex justify-center items-center bg-primary hover:bg-blue-500 text-gray-100 p-3 rounded-lg tracking-wide font-semibold transition-colors duration-300"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : null}
                {isLoading ? "Signing In..." : "Sign In"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated */}
      <div className="absolute bottom-0 left-0 w-full h-80 overflow-hidden">
        {/* Enhanced Wave SVG */}
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            fill="url(#waveGradient)"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          {/* Additional wave layer for depth */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
            fill="#ffffff"
            fillOpacity="0.7"
            d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,160C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
}
