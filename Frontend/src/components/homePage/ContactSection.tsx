import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

interface ContactSectionProps {
  id: string;
  forwardedRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Contact section component with contact form and information
 */
export const ContactSection: React.FC<ContactSectionProps> = ({ id, forwardedRef }) => {
  return (
    <section
      id={id}
      ref={forwardedRef}
      className="h-auto min-h-screen bg-gradient-to-b from-[#20488d] to-[#1b3366] pt-24 pb-12 flex items-center relative overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Contact Us</h2>
          <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Have questions or ready to transform your institution? Get in touch with our team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <ContactForm />
          <ContactInfo />
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
            className="fill-current bg-[#10234f] border-0 border-[#10234f] text-[#10234f]"
          />
        </svg>
      </div>
    </section>
  );
};

/**
 * Contact form component
 */
const ContactForm: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Send us a message</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

/**
 * Contact information component
 */
const ContactInfo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col justify-between space-y-8"
    >
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Contact Information</h3>
        <div className="space-y-6">
          <ContactInfoItem
            icon={<MapPin className="w-6 h-6 text-blue-900 mr-4 mt-1 flex-shrink-0" />}
            title="Address"
            content="Indian Institute of Information Technology Una, 177209"
          />
          <ContactInfoItem
            icon={<Phone className="w-6 h-6 text-blue-900 mr-4 mt-1 flex-shrink-0" />}
            title="Phone"
            content="+91 9225679921"
          />
          <ContactInfoItem
            icon={<Mail className="w-6 h-6 text-blue-900 mr-4 mt-1 flex-shrink-0" />}
            title="Email"
            content="amanchn13@gmail.com"
          />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Business Hours</h3>
        <div className="w-full overflow-hidden">
          <Image
            src="https://eskooly.com/assets/images/illustrations/drawings/line-city.svg"
            height={16}
            width={450}
            alt=""
            className="w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
};

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

/**
 * Contact information item component
 */
const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-start">
      {icon}
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-blue-100 mt-1 break-all">{content}</p>
      </div>
    </div>
  );
}; 