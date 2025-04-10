// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  History,
  Settings,
  LogOut,
  Calendar,
  MessageSquare,
  Menu,
} from "lucide-react";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { to: "/dashboard/profile", label: "Profile", icon: <User size={20} /> },
  { to: "/dashboard/book", label: "Book Ride", icon: <Calendar size={20} /> },
  { to: "/dashboard/trips", label: "Trip History", icon: <History size={20} /> },
  { to: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  { to: "/dashboard/ai-chat", label: "AI Chat", icon: <MessageSquare size={20} /> },
];

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 64 }}
      className="h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-700 shadow-sm flex flex-col transition-all duration-300"
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <span className="text-lg font-bold text-blue-600 dark:text-white">
          {isOpen && "🧭 VoyageAI"}
        </span>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
        >
          <Menu />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-blue-50 dark:hover:bg-gray-800 text-sm font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            {link.icon}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  {link.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full text-left text-red-500 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
