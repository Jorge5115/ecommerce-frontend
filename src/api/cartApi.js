import axiosInstance from './axios';

export const cartApi = {
    get: () => axiosInstance.get('/cart'),
    add: (data) => axiosInstance.post('/cart/add', data),
    update: (productId, quantity) => axiosInstance.put(`/cart/update/${productId}?quantity=${quantity}`),
    remove: (productId) => axiosInstance.delete(`/cart/remove/${productId}`),
    clear: () => axiosInstance.delete('/cart/clear'),
};