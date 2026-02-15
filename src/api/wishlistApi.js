import axiosInstance from './axios';

export const wishlistApi = {
    getAll: () => axiosInstance.get('/wishlist'),
    add: (productId) => axiosInstance.post(`/wishlist/${productId}`),
    remove: (productId) => axiosInstance.delete(`/wishlist/${productId}`),
    moveToCart: (productId) => axiosInstance.post(`/wishlist/${productId}/move-to-cart`),
};