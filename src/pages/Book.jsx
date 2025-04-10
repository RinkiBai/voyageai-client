import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";
import LocationSearch from "../components/LocationSearch";
import MapPreview from "../components/MapPreview";

const Book = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rideType, setRideType] = useState("economy");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [fare, setFare] = useState(300); // later calculate dynamically
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/bookings", {
        pickupLocation,
        dropoffLocation,
        rideType,
        paymentMethod,
        fare,
      });

      toast.success("Booking confirmed! 🚕");
      navigate("/dashboard/trips"); // or /profile
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">🗺️ Book a Ride</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Pickup Location</label>
          <LocationSearch
            value={pickupLocation}
            onChange={setPickupLocation}
            placeholder="Enter pickup"
            enableCurrentLocation={true}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Drop-off Location</label>
          <LocationSearch
            value={dropoffLocation}
            onChange={setDropoffLocation}
            placeholder="Enter drop-off"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ride Type</label>
          <select
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="economy">🚗 Economy</option>
            <option value="premium">🚘 Premium</option>
            <option value="luxury">🚖 Luxury</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="cash">💵 Cash</option>
            <option value="card">💳 Card</option>
            <option value="upi">📱 UPI</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Book Now
        </button>
      </form>

      {pickupLocation && dropoffLocation && (
        <div className="mt-6">
          <MapPreview origin={pickupLocation} destination={dropoffLocation} />
        </div>
      )}
    </div>
  );
};

export default Book;
