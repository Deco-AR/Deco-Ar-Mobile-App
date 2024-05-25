import api from '.';

export const getAllListedProducts = async (filter) => {
  const response = await api.get(`/products/list?category=${filter}`);
  return response.data;
};

export const getProductReviews = async (productId) => {
  const response = await api.get(`/review-by-product/${productId}`);
  return response?.data?.reviews;
};