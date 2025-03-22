import { motion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";
import { ReviewCard } from "./ReviewCard";
import college from "../../../public/college.png";
import attendance from "../../../public/attendance.png";
import intern from "../../../public/intern.png";
import pyq from "../../../public/pyq.png";
import networking from "../../../public/networking.png";
import additional from "../../../public/additional.png";

interface WorkSectionProps {
  id: string;
  forwardedRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Work section component featuring a rotating marquee of review cards
 */
export const WorkSection: React.FC<WorkSectionProps> = ({ id, forwardedRef }) => {
  const reviews = [
    {
      name: "College Management",
      body: "Manage documents without having to sit under piles of paper",
      img: college,
    },
    {
      name: "Attendance Management",
      body: "Proxy-proof sound-cum-face recognition based attendance",
      img: attendance,
    },
    {
      name: "Internship & Placement Support",
      body: "Connect with recruiters and showcase your skills",
      img: intern,
    },
    {
      name: "PYQ Papers",
      body: "Access to previous year papers with solutions",
      img: pyq,
    },
    {
      name: "Additional Features",
      body: "Additional features for college like fee payments and admission stats",
      img: additional,
    },
    {
      name: "Networking",
      body: "Collaborate with other institutions through exciting events",
      img: networking,
    },
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <section
      id={id}
      ref={forwardedRef}
      className="h-auto min-h-screen bg-gradient-to-b from-[#8fb1f6] to-[#d8e6ff] pt-24 pb-12 flex items-center relative overflow-hidden"
    >
      {/* Section separator at the top */}
      {/* <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#4a7aff] to-transparent"></div> */}
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2a4080]">
            Our <span className="text-[#1a2e60]">Work</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-[#2a4080] mx-auto"></div>
        </motion.div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s] h-[250px] sm:h-64">
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s] h-[250px] sm:h-64">
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
        </div>
      </div>
      
      {/* Wave divider */}
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
            className="fill-current text-[#2a4080]/40"
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
            className="fill-current text-[#2a4080]"
          />
        </svg>
      </div>
    </section>
  );
}; 