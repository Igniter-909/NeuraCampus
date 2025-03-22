import { motion } from "framer-motion";
import Image from "next/image";
import { WaveDivider } from "./HeroSection";
import about from "../../../public/about.png";

interface AboutSectionProps {
  id: string;
  forwardedRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * About section component for the homepage
 * Includes animated content blocks and responsive layout
 */
export const AboutSection: React.FC<AboutSectionProps> = ({ id, forwardedRef }) => {
  return (
    <section
      id={id}
      ref={forwardedRef}
      className="h-auto min-h-screen bg-gradient-to-b from-[#10234f] to-[#1a4090] border-0 pt-24 pb-12 flex items-center relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">About Us</h2>
          <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="aspect-square w-full max-w-lg mx-auto"
          >
            <Image
              src={about}
              alt="About NeuraCampus"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-left space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Our Mission</h3>
              <p className="text-sm sm:text-base text-blue-100">
                NeuraCampus is dedicated to revolutionizing educational management through innovative technology
                solutions. We believe that efficient administration is the backbone of quality education.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Our Vision</h3>
              <p className="text-sm sm:text-base text-blue-100">
                We envision a world where educational institutions can focus on teaching and learning, while
                administrative processes run seamlessly in the background.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8">
              <StatsCard value="10+" label="Years Experience" />
              <StatsCard value="500+" label="Institutions" />
              <StatsCard value="24/7" label="Support" />
              <StatsCard value="99.9%" label="Uptime" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom wave divider */}
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
            className="fill-current text-[#3d57a5]/80"
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
            className="fill-current text-[#8ca8fb]"
          />
        </svg>
      </div>
    </section>
  );
};

interface StatsCardProps {
  value: string;
  label: string;
}

/**
 * Simple stats card for displaying metrics
 */
const StatsCard: React.FC<StatsCardProps> = ({ value, label }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
      <h4 className="text-lg sm:text-xl font-bold text-white">{value}</h4>
      <p className="text-sm text-blue-100">{label}</p>
    </div>
  );
}; 