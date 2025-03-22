import { cn } from "@/lib/utils";
import Image from "next/image";

interface ReviewCardProps {
  img: any;
  name: string;
  body: string;
}

/**
 * Review card component for displaying testimonials or features
 */
export const ReviewCard: React.FC<ReviewCardProps> = ({ img, name, body }) => {
  return (
    <figure
      className={cn(
        "relative w-[280px] sm:w-72 md:w-80 mx-3 sm:mx-4 p-4 sm:p-6 rounded-2xl transition-all duration-300",
        "border border-blue-300/20 shadow-md",
        "bg-gradient-to-br from-[#4a7aff]/20 to-[#2a4080]/30",
        "hover:scale-[1.02] hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10",
        "backdrop-blur-sm",
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-white/5 z-[-1]"></div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-blue-300/20 shadow-md overflow-hidden bg-white/10 flex items-center justify-center">
          <Image
            className="w-full h-full object-cover"
            width={56}
            height={56}
            alt=""
            src={img || "/placeholder.svg"}
          />
        </div>
        <figcaption className="text-base sm:text-lg font-semibold text-[#0f1c3f]">{name}</figcaption>
      </div>
      <blockquote className="mt-3 text-xs sm:text-sm text-[#172a54] leading-relaxed font-medium">"{body}"</blockquote>
    </figure>
  );
}; 