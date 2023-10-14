import api from '.';
import localStorage from '../utils/localStorage';

export const login = async (email, password) => {
  const response = await api.post('/user/login', {email, password});
  return response.data;
};

export const register = async ({name, email, password, role}) => {
  const response = await api.post('/user/create', {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

export const sendOtp = async email => {
  const response = await api.post('/otp', {email});
  return response.data;
};

export const verifyCode = async (email, otp) => {
  const response = await api.post('/verify-otp', {email, otp});
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('token');
};
