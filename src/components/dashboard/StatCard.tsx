
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="dashboard-label">{title}</p>
          <p className="dashboard-stat mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.positive ? "+" : "-"}{trend.value}
              </span>
              <span className="text-xs text-muted-foreground mr-1">
                من الشهر الماضي
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
