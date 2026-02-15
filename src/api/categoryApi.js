import axiosInstance from './axios';

export const categoryApi = {
    getAll: () =>
        axiosInstance.get('/categories'),

    getById: (id) =>
        axiosInstance.get(`/categories/${id}`),
};