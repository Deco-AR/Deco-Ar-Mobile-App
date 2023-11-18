import api from '.';

export const getProfileById = async id => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};

export const updateProfile = async ({id, data}) => {
  const response = await api.put(`/profile/${id}`, data);
  return response.data;
};
