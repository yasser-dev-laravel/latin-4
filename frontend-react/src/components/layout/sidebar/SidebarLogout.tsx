
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLogoutProps {
  isCollapsed: boolean;
}

const SidebarLogout = ({ isCollapsed }: SidebarLogoutProps) => (
  <div className="p-4 border-t">
    <div
      className={cn(
        "flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer",
        {
          "justify-center": isCollapsed,
        }
      )}
    >
      <span className="flex-shrink-0">
        <LogOut size={22} />
      </span>
      <span
        className={cn("text-sm font-medium", {
          hidden: isCollapsed,
        })}
      >
        تسجيل الخروج
      </span>
    </div>
  </div>
);

export default SidebarLogout;
