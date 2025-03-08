import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  className = '',
}: StatsCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-xl p-6 h-[160px] flex flex-col justify-between',
      className
    )}>
      <div className="flex items-start justify-between">
        <h3 className="text-3xl font-semibold">{value}</h3>
        {icon && (
          <div className="p-2">
            <div className="text-3xl w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className=" text-sm">{title}</p>
        {trend && (
          <div className="flex items-center">
            <Badge variant="outline" className={cn(
              'bg-white',
              trend.isPositive ? 'text-green-500 border-green-200' : 'text-red-500 border-red-200'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
} 