"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Safari } from "./SafariDemo"
export function ImageCollage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full max-w-[1500px] hidden lg:block">
    

      {/* Smaller Jobs Image */}
      <motion.div
        className="absolute z-10 shadow-2xl shadow-blue-950  rounded-xl overflow-hidden border-4 border-white/20"
        initial={{ opacity: 0, x: -100, rotate: -8, y: 0 }}
        animate={isVisible ? { opacity: 1, x: 0, rotate: 0, y: [0, -20, 10, -15, 5, 10, 0] } : {}}
        transition={{ duration: 2.2, ease: "easeInOut", loop: Infinity }}
        style={{ width: "100%", maxWidth: "800px", top: "-35%", right: "5%" }}
      > 
      
        <Safari
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%284%29-RMeMCy0nC6NXlh6d1WscgwBJSi2NrX.png"
          // alt="NeuraCampus Jobs"
          // width={800}
          // height={600}
          className="size-full"
        />
      </motion.div>

      {/* Smaller Dashboard Light Image */}
      <motion.div
        className="absolute z-40 shadow-2xl shadow-blue-600 rounded-xl overflow-hidden border-4 border-white/20"
        initial={{ opacity: 0, x: -100, rotate: 8, y: 0 }}
        animate={isVisible ? { opacity: 1, x: 0, rotate: 0, y: [0, 15, -10, 20, -5, 10, 0] } : {}}
        transition={{ duration: 2.2, ease: "easeInOut", loop: Infinity }}
        style={{ width: "80%", maxWidth: "1000px", top: "25%", left: "25%" }}
      >
        <Safari
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-N14FYSzapK9Wncm08KXQQFqZdghXWJ.png"
          // alt="NeuraCampus Dashboard Light"
          // width={800}
          // height={600}
          className="size-full"
        />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute rounded-full bg-blue-600/30 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.2 } : {}}
        transition={{ duration: 1.5, delay: 1 }}
        style={{ width: "200px", height: "200px", top: "30%", left: "30%" }}
      />
      <motion.div
        className="absolute rounded-full bg-indigo-500/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.2 } : {}}
        transition={{ duration: 1.5, delay: 1.2 }}
        style={{ width: "150px", height: "150px", top: "60%", left: "10%" }}
      />
    </div>
  )
}

