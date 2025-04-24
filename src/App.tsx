import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CoursesProvider } from "./contexts/CoursesContext";
import { BranchesProvider } from "./contexts/BranchesContext";

import Login from "./pages/Login";
import Index from "./pages/Index";
import Layout from "./components/layout/Layout";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Groups from "./pages/Groups";
import Instructors from "./pages/Instructors";
import Rooms from "./pages/Rooms";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Branches from "./pages/Branches";
import Leads from "./pages/Leads";
import Messages from "./pages/Messages";
import Cashboxes from "./pages/Cashboxes";
import Receipts from "./pages/Receipts";
import Attendances from "./pages/Attendances";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Cairo, Roboto, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "hsl(var(--primary))",
      light: "hsl(var(--accent))",
      dark: "hsl(var(--primary))",
      contrastText: "hsl(var(--primary-foreground))",
    },
    secondary: {
      main: "hsl(var(--secondary))",
      light: "hsl(var(--accent))",
      dark: "hsl(var(--secondary))",
      contrastText: "hsl(var(--secondary-foreground))",
    },
    background: {
      default: "hsl(var(--background))",
      paper: "hsl(var(--card))",
    },
    text: {
      primary: "hsl(var(--foreground))",
      secondary: "hsl(var(--muted-foreground))",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          direction: "rtl",
          backgroundColor: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        },
      },
    },
  },
});

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CoursesProvider>
          <BranchesProvider>
            <Router basename="/">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Index />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <PrivateRoute>
                      <Courses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/students"
                  element={
                    <PrivateRoute>
                      <Students />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/groups"
                  element={
                    <PrivateRoute>
                      <Groups />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/instructors"
                  element={
                    <PrivateRoute>
                      <Instructors />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/rooms"
                  element={
                    <PrivateRoute>
                      <Rooms />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <PrivateRoute>
                      <Employees />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/departments"
                  element={
                    <PrivateRoute>
                      <Departments />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/branches"
                  element={
                    <PrivateRoute>
                      <Branches />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/leads"
                  element={
                    <PrivateRoute>
                      <Leads />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <PrivateRoute>
                      <Messages />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cashboxes"
                  element={
                    <PrivateRoute>
                      <Cashboxes />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/receipts"
                  element={
                    <PrivateRoute>
                      <Receipts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/attendances"
                  element={
                    <PrivateRoute>
                      <Attendances />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Router>
          </BranchesProvider>
        </CoursesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
