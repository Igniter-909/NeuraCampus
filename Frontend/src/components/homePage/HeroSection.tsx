import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { BeamsBackground } from "@/components/ui/beams-background";
import { BackgroundShapes } from "@/components/ui/background-shapes";
import { ImageCollage } from "@/components/ui/image-collage";

interface HeroSectionProps {
  id: string;
  forwardedRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hero section component for the homepage
 * Features animated elements, typwriter effect, and responsive layout
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ id, forwardedRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setStartTyping(true), 600);
    }, 2200);
  }, []);

  return (
    <section
      id={id}
      ref={forwardedRef}
      className="h-auto min-h-screen w-full pt-32 sm:pt-28 pb-12 sm:pb-16 flex items-center relative"
    >
      <BeamsBackground className="absolute inset-0" />
      <BackgroundShapes />
      <div className="relative z-10 flex flex-col w-full">
        <main className="max-w-full mx-4 sm:mx-10 flex items-center my-5 md:my-auto px-4 sm:px-6 lg:px-0 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
            <div className="flex flex-col justify-center space-y-6">
              {isLoading ? (
                <motion.div
                  className="text-white text-2xl sm:text-3xl font-bold"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                ></motion.div>
              ) : (
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <span className="block">Welcome to</span>
                  <span className="block text-gray-900">
                    {startTyping && (
                      <>
                        <span className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Neura</span>
                        <span className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                          <Typewriter words={["Campus"]} typeSpeed={300} delaySpeed={500} cursor loop={true} />
                        </span>
                      </>
                    )}
                  </span>
                </motion.h1>
              )}
              <motion.p
                className="mt-2 text-sm sm:text-base md:text-lg text-blue-100 max-w-md sm:max-w-lg md:max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
              >
                A comprehensive solution for managing educational institutions. Streamline your academic processes,
                enhance communication, and improve efficiency.
              </motion.p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="w-full flex items-center justify-center px-6 sm:px-8 py-3 text-base font-medium rounded-md text-white bg-blue-700/80 backdrop-blur-[80px] shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-blue-800 transition-all ease-in-out duration-300 md:py-4 md:text-lg"
                  >
                    Register Now
                  </Link>
                </motion.div>
                <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center px-6 sm:px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-white shadow-[0px_17px_18px_0px_rgba(0,0,0,0.2)] hover:bg-gray-100 transition-all ease-in-out duration-300 md:py-4 md:text-lg"
                  >
                    Login 
                  </Link>
                </motion.div>
              </div>
            </div>
            <div className="hidden lg:block">
              <ImageCollage />
            </div>
          </div>
        </main>
      </div>
      <WaveDivider />
    </section>
  );
};

/**
 * Animated wave divider component for section transitions
 */
export const WaveDivider: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10">
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
          className="fill-current text-[#10234f]"
        />
      </svg>
    </div>
  );
}; 