import axiosInstance from './axios';

export const reviewApi = {
    getByProduct: (productId, page = 0) =>
        axiosInstance.get(`/reviews/product/${productId}?page=${page}`),
    create: (data) => axiosInstance.post('/reviews', data),
    delete: (id) => axiosInstance.delete(`/reviews/${id}`),
};