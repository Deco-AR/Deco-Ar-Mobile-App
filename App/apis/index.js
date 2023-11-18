import axios from 'axios';
import localStorage from '../utils/localStorage';

const api = axios.create({
  baseURL: 'http://35.154.49.30:5000/api',
});

api.interceptors.request.use(
  async config => {
    const token = localStorage.getString('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;
