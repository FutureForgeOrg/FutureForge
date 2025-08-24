import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

// for 403 -> error due to banned user
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      // Handle 403 errors globally
      alert('Access forbidden: You might be banned or do not have the necessary permissions.');
    }

    return Promise.reject(error);
  }
);