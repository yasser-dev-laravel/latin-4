
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import SidebarMenu from "./sidebar/SidebarMenu";
import SidebarCollapseToggle from "./sidebar/SidebarCollapseToggle";
import SidebarLogout from "./sidebar/SidebarLogout";

const Sidebar = () => {
  const { isMobileMenuOpen } = useMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((c) => !c);
  };

  const sidebarClasses = cn(
    "min-h-screen bg-white border-l flex flex-col transition-all duration-300 dir-rtl",
    {
      "w-64": !isCollapsed,
      "w-20": isCollapsed,
      "fixed top-0 right-0 z-40 shadow-lg": isMobileMenuOpen,
      "hidden md:flex": !isMobileMenuOpen,
    }
  );

  return (
    <aside className={sidebarClasses}>
      <div className="flex items-center justify-between p-4 border-b">
        <Link
          to="/"
          className={cn("font-bold text-lg text-primary", {
            hidden: isCollapsed,
          })}
        >
          نظام إدارة المعهد
        </Link>
        <SidebarCollapseToggle isCollapsed={isCollapsed} onToggle={toggleCollapse} />
      </div>
      <SidebarMenu isCollapsed={isCollapsed} />
      <SidebarLogout isCollapsed={isCollapsed} />
    </aside>
  );
};

export default Sidebar;
