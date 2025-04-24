
import { ChevronDown, ChevronUp } from "lucide-react";

interface SidebarCollapseToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const SidebarCollapseToggle = ({ isCollapsed, onToggle }: SidebarCollapseToggleProps) => (
  <button
    onClick={onToggle}
    className="hidden md:block p-1 rounded-md hover:bg-gray-100"
    aria-label="Toggle Sidebar"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {isCollapsed ? (
        <ChevronDown />
      ) : (
        <ChevronUp />
      )}
    </svg>
  </button>
);

export default SidebarCollapseToggle;
