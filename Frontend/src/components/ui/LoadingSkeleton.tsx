import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSkeleton({ height = "md", className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        height === "sm" && "h-4",
        height === "md" && "h-8",
        height === "lg" && "h-16",
        className
      )}
    />
  );
} 