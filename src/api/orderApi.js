import axiosInstance from './axios';

export const orderApi = {
    create: (data) => axiosInstance.post('/orders', data),
    getAll: (page = 0) => axiosInstance.get(`/orders?page=${page}`),
    getById: (id) => axiosInstance.get(`/orders/${id}`),
    cancel: (id) => axiosInstance.put(`/orders/${id}/cancel`),
};