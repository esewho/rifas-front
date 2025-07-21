import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "./auth";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL  || "http://localhost:3000",
  withCredentials: true, // para que mande cookies con CORS
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request para añadir token
http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response para hacer logout en 401
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout(); 
    }
    return Promise.reject(error);
  }
);

export default http;
