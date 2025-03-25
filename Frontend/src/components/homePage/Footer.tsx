import Image from "next/image";
import logo from "../../../public/logo11.svg";

/**
 * Footer component for the homepage
 */
export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#10234f] backdrop-blur-sm border-t border-white/10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <Image className="h-8 w-auto" src={logo} alt="Logo" width={32} height={32} />
            <span className="ml-2 text-xl font-bold text-white">
              Neura<span className="text-blue-300">Campus</span>
            </span>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-blue-100 text-sm">© {new Date().getFullYear()} NeuraCampus. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <button className="text-sm text-blue-300 hover:text-white transition-colors">Privacy Policy</button>
              <button className="text-sm text-blue-300 hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 