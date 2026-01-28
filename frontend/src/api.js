import axios from 'axios';

// Determine API URL based on environment
// In production, use the Render backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://portfolio-1-7r85.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Error] Request failed:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] Status ${response.status} from ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API Error] Status ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('[API Error] No response received:', error.request);
    } else {
      console.error('[API Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
