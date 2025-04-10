import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">📖 All User Bookings</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow text-sm text-gray-800 dark:bg-gray-900 dark:text-white">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left">
              <tr>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Pickup</th>
                <th className="p-3 border">Drop</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Payment</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="p-3 border">
                    <strong>{b.user?.name || "N/A"}</strong>
                    <br />
                    <span className="text-xs text-gray-500">{b.user?.email}</span>
                  </td>
                  <td className="p-3 border">{b.pickup}</td>
                  <td className="p-3 border">{b.drop}</td>
                  <td className="p-3 border">{b.rideType}</td>
                  <td className="p-3 border capitalize">{b.paymentMethod}</td>
                  <td className="p-3 border text-center">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        b.paymentStatus === "paid"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 border">{new Date(b.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
