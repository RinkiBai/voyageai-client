import React, { useEffect, useState } from "react";
import { getBookings, cancelBooking } from "../api";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const data = await getBookings(token);
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(id, token);
        fetchBookings(); // Refresh
      } catch (err) {
        console.error("Failed to cancel booking:", err);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">📋 Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="bg-white p-4 rounded shadow">
              <p><strong>Pickup:</strong> {booking.pickup}</p>
              <p><strong>Drop:</strong> {booking.drop}</p>
              <p><strong>Ride Type:</strong> {booking.rideType}</p>
              <p><strong>Date:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBookings;
