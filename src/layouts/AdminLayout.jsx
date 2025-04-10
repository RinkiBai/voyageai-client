// src/layouts/AdminLayout.jsx
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LogOut,
  Moon,
  Sun,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Home,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; // update this if your auth is different
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function AdminLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // fallback: replace with your auth logic

  const handleLogout = () => {
    logout(); // or localStorage.clear() if not using auth hook
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Manage Users", icon: Users },
    { to: "/admin/bookings", label: "Manage Bookings", icon: CalendarCheck },
    { to: "/", label: "Home", icon: Home },
  ];

  return (
    <div
      className={clsx(
        "flex min-h-screen transition-colors",
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      )}
    >
      {/* Sidebar */}
      <aside
        className={clsx(
          "flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 shadow-md transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center justify-between">
          <h1 className={clsx("text-xl font-bold", !sidebarOpen && "hidden")}>
            🚀 Admin Panel
          </h1>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="text-lg">{sidebarOpen ? "«" : "»"}</span>
          </Button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition",
                  isActive ? "bg-blue-600 text-white" : ""
                )
              }
            >
              <Icon className="w-5 h-5" />
              {sidebarOpen && label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <Button
            variant="ghost"
            onClick={toggleDarkMode}
            className="flex items-center gap-3 justify-start"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {sidebarOpen && "Toggle Theme"}
          </Button>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="flex items-center gap-3 justify-start"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            Welcome, {user?.role === "admin" ? "Admin" : "User"}
          </h2>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
