"use client";
import React from "react";
import { motion } from "framer-motion";
export default function Wave1() {
  return (
    // Bottom Wave Section
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
  );
}
