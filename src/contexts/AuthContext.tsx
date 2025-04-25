import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/user";
import apiClient from "../api/apiClient";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

      if (token && storedUser) {
        try {
          const response = await apiClient.get("/user");
          const userData = response.data;
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth check failed:", error);
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      console.log('Attempting login with:', { email, rememberMe });
      
      const response = await apiClient.post("/auth/login", { 
        email, 
        password, 
        remember_me: rememberMe 
      });
      
      console.log('Login response:', response.data);
      
      const { user: userData, token } = response.data;
      
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", token);
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: any) {
      console.error("Login failed:", error);
      
      // تسجيل تفاصيل الخطأ
      if (error.response) {
        console.error('Error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 401) {
        throw new Error("بيانات الدخول غير صحيحة");
      } else if (error.response?.status === 500) {
        throw new Error("حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً");
      } else if (error.request) {
        throw new Error("تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت");
      } else {
        throw new Error("حدث خطأ أثناء محاولة تسجيل الدخول");
      }
    }
  };

  const logout = async () => {
    try {
      if (isAuthenticated) {
        await apiClient.post("/auth/logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      delete apiClient.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 