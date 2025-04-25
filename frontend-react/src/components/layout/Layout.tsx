import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import SidebarLayout from "./sidebar/layout";
import { useMobile } from "@/hooks/use-mobile";

const drawerWidth = 240;

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, isAuthenticated } = useAuth();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobile();

  // التحقق من حالة المصادقة
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  if (!isAuthenticated || !user) {
    return null;
  }

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
            أكاديمية المعهد اللاتيني
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="subtitle1" sx={{ mx: 2 }}>
            {user?.name || "مستخدم"}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            تسجيل الخروج
          </Button>
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
          pr: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // mr: { sm: `${drawerWidth}px` },
          mr: 2,

          mt: 8,
        }}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
} 