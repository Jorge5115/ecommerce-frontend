import axiosInstance from './axios';

export const productApi = {
    getAll: (page = 0, size = 12) =>
        axiosInstance.get(`/products?page=${page}&size=${size}`),

    getById: (id) =>
        axiosInstance.get(`/products/${id}`),

    search: (params) =>
        axiosInstance.get('/products/search', { params }),

    create: (data) =>
        axiosInstance.post('/products', data),

    update: (id, data) =>
        axiosInstance.put(`/products/${id}`, data),

    delete: (id) =>
        axiosInstance.delete(`/products/${id}`),
};