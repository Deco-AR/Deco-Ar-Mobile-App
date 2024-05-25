import api from '.';

export const getAllListedProducts = async (filter) => {
  const response = await api.get(`/products/list?category=${filter}`);
  return response.data;
};
