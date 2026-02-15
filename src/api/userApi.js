import axiosInstance from './axios';

export const userApi = {
    getProfile: () => axiosInstance.get('/users/profile'),
    updateProfile: (data) => axiosInstance.put('/users/profile', data),
};