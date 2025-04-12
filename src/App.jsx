// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Book from "./pages/Book";
import AIChat from "./pages/AIChat";

// Dashboard
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import TripHistory from "./pages/dashboard/TripHistory";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Theme
import { useTheme } from "@/context/ThemeContext";

const App = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "dark" : ""}`}>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* User Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="trips" element={<TripHistory />} />
            </Route>
            <Route path="/book" element={<Book />} />
            <Route path="/ai-chat" element={<AIChat />} />
          </Route>

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
