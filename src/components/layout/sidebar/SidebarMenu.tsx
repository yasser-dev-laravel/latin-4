
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User2,
  Users,
  BookOpen,
  GraduationCap,
  Home,
  CircleUser,
  FolderKanban,
  Building2,
  MessagesSquare,
  Wallet,
  Receipt,
  CalendarCheck,
  MessageSquare, // إضافة الأيقونة
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

const menuItems = [
  {
    title: "لوحة التحكم",
    icon: <LayoutDashboard size={22} />,
    path: "/",
  },
  {
    title: "الطلاب",
    icon: <User2 size={22} />,
    path: "/students",
  },
  {
    title: "المجموعات",
    icon: <Users size={22} />,
    path: "/groups",
  },
  {
    title: "الكورسات",
    icon: <BookOpen size={22} />,
    path: "/courses",
  },
  {
    title: "المحاضرين",
    icon: <GraduationCap size={22} />,
    path: "/instructors",
  },
  {
    title: "القاعات",
    icon: <Home size={22} />,
    path: "/rooms",
  },
  {
    title: "الموظفين",
    icon: <CircleUser size={22} />,
    path: "/employees",
  },
  {
    title: "الأقسام",
    icon: <FolderKanban size={22} />,
    path: "/departments",
  },
  {
    title: "الفروع",
    icon: <Building2 size={22} />,
    path: "/branches",
  },
  {
    title: "العملاء المحتملين",
    icon: <MessagesSquare size={22} />,
    path: "/leads",
  },
  // --------- العنصر الجديد للرسائل -------
  {
    title: "الرسائل",
    icon: <MessageSquare size={22} />,
    path: "/messages",
  },
  // -----------------------------------
  {
    title: "الخزينة",
    icon: <Wallet size={22} />,
    path: "/cashboxes",
  },
  {
    title: "الإيصالات",
    icon: <Receipt size={22} />,
    path: "/receipts",
  },
  {
    title: "الغيابات",
    icon: <CalendarCheck size={22} />,
    path: "/attendances",
  },
];

interface SidebarMenuProps {
  isCollapsed: boolean;
  onNavigate?: () => void;
}

const SidebarMenu = ({ isCollapsed, onNavigate }: SidebarMenuProps) => {
  const location = useLocation();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobile();

  // Optional: close menu after click
  const handleLinkClick = () => {
    if (onNavigate) onNavigate();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <ul className="space-y-1 px-3">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={cn(
                "flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md",
                {
                  "bg-primary/10 text-primary": location.pathname === item.path,
                  "hover:bg-gray-100": location.pathname !== item.path,
                  "justify-center": isCollapsed,
                }
              )}
              onClick={handleLinkClick}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span
                className={cn("text-sm font-medium", {
                  hidden: isCollapsed,
                })}
              >
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu;

