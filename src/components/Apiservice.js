import axios from "axios";

let api = axios.create();

api.interceptors.request.use(
    (config) => {
      const token = "zxsdfhgfdhsfhdvsvhgvhcgsdfhgsdf"
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Unauthorized: force logout or redirect
        localStorage.removeItem('token');
        window.location.href = '/'; // redirect to login
      }
      return Promise.reject(error);
    }
  );

  export default api;