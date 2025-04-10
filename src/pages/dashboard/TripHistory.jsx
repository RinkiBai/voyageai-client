// src/pages/dashboard/TripHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const TripHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        setError("Failed to fetch trip history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "cancelled" } : b
        )
      );
      toast.success("Booking cancelled");
    } catch (err) {
      toast.error("Failed to cancel booking");
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
            <FaCheckCircle /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm font-medium">
            <FaTimesCircle /> Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm font-medium">
            <FaClock /> {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Trip History</h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading trip history...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No trips found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <div className="space-y-1">
                  <p className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                    <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
                    {booking.pickupLocation} → {booking.dropoffLocation}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>{getStatusBadge(booking.status)}</div>
              </div>
              <div className="mt-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaRupeeSign />
                <span className="font-medium">{booking.fare}</span>
              </div>
              {booking.driverName && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Driver: <span className="font-medium">{booking.driverName}</span>
                </p>
              )}

              {booking.status?.toLowerCase() !== "cancelled" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripHistory;
