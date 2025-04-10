import axios from "axios";

// Base URL for all API requests
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Booking APIs
export const createBooking = async (data, token) => {
  try {
    const response = await API.post("/bookings", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error.response?.data?.message || "Something went wrong while creating booking";
  }
};

export const getBookings = async (token) => {
  try {
    const response = await API.get("/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error.response?.data?.message || "Something went wrong while fetching bookings";
  }
};

export const cancelBooking = async (id, token) => {
  try {
    const response = await API.delete(`/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error.response?.data?.message || "Something went wrong while canceling booking";
  }
};

// ✅ AI Chat API
export const sendMessageToAI = async (message) => {
  try {
    const response = await API.post("/chat", { message });
    return response.data.reply;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    throw error.response?.data?.error || "Something went wrong while communicating with AI";
  }
};
