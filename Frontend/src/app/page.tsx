"use client"
import Image from "next/image"
import logo from "../../public/logo11.svg" // Static import
import Link from "next/link"
import { BeamsBackground } from "@/components/ui/beams-background"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { useEffect, useState } from "react"
import { BackgroundShapes } from "@/components/ui/background-shapes"
import { ImageCollage } from "@/components/ui/image-collage"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setStartTyping(true), 600)
    }, 2200)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      <BeamsBackground className="absolute inset-0" />
      <BackgroundShapes />

      <div className="relative z-10 flex flex-col flex-1">
        <nav className="bg-transparent shadow-md border border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <Image className="h-8 w-auto" src={logo || "/placeholder.svg"} alt="Logo" width={32} height={32} />
                  <span className="ml-2 text-xl font-bold text-white">
                    Neura<span className="text-black">Campus</span>
                  </span>
                </Link>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="text-white hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-white/90 hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white/90 hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/our-work"
                    className="text-white/90 hover:text-gray-900 transition-all ease-in-out duration-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
                  >
                    Our Work
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-transparent border shadow-xl border-white text-white hover:bg-white/10 hover:text-black transition-all ease-in-out duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-full mx-10 flex items-center my-auto px-4 sm:px-6 lg:px-0 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
           
          <div className="flex flex-col justify-center">
            {isLoading ? (
              <motion.div
                className="text-white text-3xl font-bold"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              ></motion.div>
            ) : (
              <motion.h1
                className="text-5xl  tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span className="block">Welcome to</span>
                <span className="block text-gray-900">
                  {startTyping && (
                    <>
                      <span className="text-white text-6xl sm:text-7xl md:text-8xl">Neura</span>
                      <span className="text-black text-5xl sm:text-6xl md:text-7xl">
                        <Typewriter words={["Campus"]} typeSpeed={300} delaySpeed={500} cursor loop={true} />
                      </span>
                    </>
                  )}
                </span>
              </motion.h1>
            )}
            <motion.p
              className="mt-2 line-clamp-2 max-w-md mx-2 text-sm text-blue-100 sm:text-md md:max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
            >
              A comprehensive solution for managing educational institutions.
              Streamline your academic processes, enhance communication, and improve efficiency.
            </motion.p>

            

            <div className="mt-6 max-w-md mx-2 sm:flex sm:justify-center">
              <motion.div className="rounded-md shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-700/80 backdrop-blur-[80px] shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-blue-800 transition-all ease-in-out duration-300 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </Link>
              </motion.div>
              <motion.div
                className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-white shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 transition-all ease-in-out duration-300 md:py-4 md:text-lg md:px-10"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </div>
          <ImageCollage/>

          </div>
        </main>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
          className="w-full space-x-reverse h-auto"
        >
          <motion.path
            initial={{
              d: "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
            }}
            animate={{
              d: [
                "M321.39,75.44c58-20.79,114.16-32.13,172-45.86,82.39-22.72,168.19-22.73,250.45-4.39C823.78,35,906.67,85,985.66,105.83c70.05,18.48,146.53,28.09,214.34,6V0H0V32.35A600.21,600.21,0,0,0,321.39,75.44Z",
                "M321.39,80.44c58-15.79,114.16-35.13,172-50.86,82.39-20.72,168.19-22.73,250.45-3.39C823.78,40,906.67,90,985.66,110.83c70.05,20.48,146.53,30.09,214.34,8V0H0V35.35A600.21,600.21,0,0,0,321.39,80.44Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 1,
              ease: "easeInOut",
            }}
            className="fill-current text-[#10234f]/40"
          />

          <motion.path
            initial={{
              d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
            }}
            animate={{
              d: [
                "M321.39,50.44c58-15.79,114.16-25.13,172-35.86,82.39-18.72,168.19-18.73,250.45-.39C823.78,20,906.67,65,985.66,85.83c70.05,16.48,146.53,24.09,214.34,5V0H0V25.35A600.21,600.21,0,0,0,321.39,50.44Z",
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              duration: 6,
              ease: "easeInOut",
            }}
            className="fill-current text-[#15347b]"
          />
        </svg>
      </div>

      <div className="absolute bottom-10 left-10 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
        </svg>
      </div>
    </div>
  )
}
