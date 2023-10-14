import api from '.';
import localStorage from '../utils/localStorage';

export const login = async (email, password) => {
  const response = await api.post('/login', {email, password});
  return response.data;
};

export const verifyCode = async code => {
  const response = await api.post('/verify-code', {code});
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post('/register', {email, password});
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('token');
};
