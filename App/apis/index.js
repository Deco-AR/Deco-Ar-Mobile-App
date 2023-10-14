import axios from 'axios';
import localStorage from '../utils/localStorage';

const api = axios.create({
  baseURL: 'https://f088-111-88-52-139.ngrok-free.app/api',
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
