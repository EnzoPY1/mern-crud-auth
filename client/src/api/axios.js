import axios from 'axios';
import Cookies from 'js-cookie';

const API = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn('No token found in cookies');
  }
  return config;
});

export default axiosInstance;