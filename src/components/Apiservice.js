import axios from "axios";

let api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {

    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {

      originalRequest._retry = true;

      try {


        const refreshToken = localStorage.getItem('refreshToken');
        const username = localStorage.getItem('username');

        const resp = await axios.get("http://localhost:3001/api/getToken", { params: { refreshToken, username } });
        const token = resp.data.accessToken

        console.log("token", token)
        if (token) localStorage.setItem('token', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);


      } catch (error) {

      }
    }






    if (error.response && error.response.status === 401) {

      // Unauthorized: force logout or redirect
      localStorage.removeItem('token');
      window.location.href = '/'; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;