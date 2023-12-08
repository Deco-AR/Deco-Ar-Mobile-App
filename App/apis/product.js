import api from '.';

export const getAllListedProducts = async () => {
  const response = await api.get('/products/list');
  return response.data;
};
