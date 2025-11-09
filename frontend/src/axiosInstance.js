import axios from "axios";

// Set up your base URL — change this if you deploy to production
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // or "http://localhost:8000"
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
