import axios from 'axios';

// Set the base URL from the environment variable
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Dynamic baseURL from .env
  withCredentials: true,  // Ensure credentials (cookies) are sent with requests
  headers: {
    "Content-Type": "application/json", // Set content type for requests
  },
});

// Interceptor to add the token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling unauthorized responses (401)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⛔ Unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
