// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://example.com/api', // replace with your real API
  timeout: 5000,
});

// REQUEST INTERCEPTOR: Attach token if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or from context/store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized: force logout or redirect
      localStorage.removeItem('token');
      window.location.href = '/login'; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;
