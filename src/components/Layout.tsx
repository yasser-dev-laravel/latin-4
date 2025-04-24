import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import SidebarLayout from "./layout/sidebar/layout";
import { useMobile } from "@/hooks/use-mobile";

const drawerWidth = 240;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobile();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: `${drawerWidth}px` },
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            أكاديمية اللغة اللاتينية
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="subtitle1">
            {user?.name || "مستخدم"}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { 
              boxSizing: "border-box", 
              width: drawerWidth,
              direction: "rtl",
            },
          }}
        >
          <SidebarLayout
            isCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { 
              boxSizing: "border-box", 
              width: drawerWidth,
              direction: "rtl",
              border: 'none',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            },
          }}
          open
        >
          <SidebarLayout
            isCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: `${drawerWidth}px` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
} 