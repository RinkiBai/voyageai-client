// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUsers, FaTaxi, FaRupeeSign } from "react-icons/fa";
import { UsersRound, BookOpenText } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const cards = [
    {
      title: "Manage Users",
      description: "View and manage all registered users.",
      icon: <UsersRound className="w-6 h-6 text-blue-600" />,
      link: "/admin/users",
    },
    {
      title: "View All Bookings",
      description: "Track all bookings from all users.",
      icon: <BookOpenText className="w-6 h-6 text-green-600" />,
      link: "/admin/bookings",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [usersRes, bookingsRes] = await Promise.all([
          axios.get("/admin/users", config),
          axios.get("/api/bookings", config),
        ]);

        setStats({
          users: usersRes.data.length,
          bookings: bookingsRes.data.length,
          revenue: bookingsRes.data.reduce((sum, b) => sum + (b.fare || 0), 0),
        });

        setRecentBookings(bookingsRes.data.slice(0, 5));
        setRecentUsers(usersRes.data.slice(0, 5));
      } catch (err) {
        toast.error("Failed to load admin data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🛡️ Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-600" />
          <div>
            <p className="text-gray-600">Total Users</p>
            <p className="text-xl font-bold">{stats.users}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaTaxi className="text-3xl text-green-600" />
          <div>
            <p className="text-gray-600">Total Bookings</p>
            <p className="text-xl font-bold">{stats.bookings}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <FaRupeeSign className="text-3xl text-yellow-600" />
          <div>
            <p className="text-gray-600">Total Revenue</p>
            <p className="text-xl font-bold">₹{stats.revenue}</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Link
              to={card.link}
              className="block bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-2">
                {card.icon}
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {card.title}
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
          <ul className="bg-white p-4 rounded shadow space-y-2">
            {recentBookings.map((b) => (
              <li key={b._id} className="text-sm text-gray-700">
                {b.pickupLocation} → {b.dropoffLocation} | ₹{b.fare}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Users</h2>
          <ul className="bg-white p-4 rounded shadow space-y-2">
            {recentUsers.map((u) => (
              <li key={u._id} className="text-sm text-gray-700">
                {u.name} - {u.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
