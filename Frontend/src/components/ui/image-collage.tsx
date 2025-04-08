"use client";

import { motion } from "framer-motion";
import { Safari } from "./SafariDemo";

export function ImageCollage() {
  return (
    <div className="relative w-full h-full max-w-[1500px] hidden lg:block">
      {/* Smaller Jobs Image */}
      <motion.div
        className="absolute z-10 shadow-2xl shadow-blue-950 rounded-xl overflow-hidden border-4 border-white/20"
        initial={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
        animate={{
          y: [0, -5, 3, -4, 2, 0], // Reduced amplitude for smoother motion
        }}
        transition={{
          duration: 6, // Increased duration for smoother motion
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror", // Smooth back-and-forth motion
        }}
        style={{ width: "100%", maxWidth: "800px", top: "-35%", right: "5%" }}
      >
        <Safari
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%284%29-RMeMCy0nC6NXlh6d1WscgwBJSi2NrX.png"
          className="size-full"
        />
      </motion.div>

      {/* Smaller Dashboard Light Image */}
      <motion.div
        className="absolute z-40 shadow-2xl shadow-blue-600 rounded-xl overflow-hidden border-4 border-white/20"
        initial={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
        animate={{
          y: [0, 5, -3, 4, -2, 0], // Reduced amplitude for smoother motion
        }}
        transition={{
          duration: 6, // Increased duration for smoother motion
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror", // Smooth back-and-forth motion
        }}
        style={{ width: "80%", maxWidth: "1000px", top: "25%", left: "25%" }}
      >
        <Safari
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-N14FYSzapK9Wncm08KXQQFqZdghXWJ.png"
          className="size-full"
        />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute rounded-full bg-blue-600/30 blur-3xl"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        style={{ width: "200px", height: "200px", top: "30%", left: "30%" }}
      />
      <motion.div
        className="absolute rounded-full bg-indigo-500/20 blur-3xl"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        style={{ width: "150px", height: "150px", top: "60%", left: "10%" }}
      />
    </div>
  );
}

