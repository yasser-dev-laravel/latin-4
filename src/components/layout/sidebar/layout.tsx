import React from "react";
import { Box } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import SidebarLogout from "./SidebarLogout";
import SidebarCollapseToggle from "./SidebarCollapseToggle";

interface SidebarLayoutProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        direction: "rtl",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <SidebarMenu isCollapsed={isCollapsed} />
      </Box>
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          p: 2,
        }}
      >
        {/* <SidebarLogout isCollapsed={isCollapsed} />
        <SidebarCollapseToggle
          isCollapsed={isCollapsed}
          onToggle={onToggleCollapse}
        /> */}
      </Box>
    </Box>
  );
};

export default SidebarLayout; 