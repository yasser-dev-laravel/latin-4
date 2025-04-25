import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App";
import "./index.css";

// إضافة معالجة الأخطاء العامة
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global error:", { message, source, lineno, colno, error });
  return false;
};

// التأكد من وجود عنصر root
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
  throw new Error("Failed to find the root element");
}

// إنشاء root element
const root = ReactDOM.createRoot(rootElement);

// محاولة الـ rendering
try {
  root.render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
  console.log("Application rendered successfully!");
} catch (error) {
  console.error("Failed to render application:", error);
} 