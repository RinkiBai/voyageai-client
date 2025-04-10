// src/pages/dashboard/DashboardHome.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">👋 Welcome back, {user?.name || "User"}!</h1>
      <p className="text-gray-700 mt-1">Here’s your travel summary:</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">📍 Total Trips</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">🚖 Last Trip</h2>
          <p className="text-gray-500 mt-2">Delhi → Agra</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">⚙️ Quick Actions</h2>
          <div className="mt-2 space-y-2">
            <Link to="/book" className="text-blue-600 hover:underline block">Book a Ride</Link>
            <Link to="/dashboard/trips" className="text-blue-600 hover:underline block">Trip History</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
