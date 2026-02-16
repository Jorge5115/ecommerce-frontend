import axiosInstance from './axios';

export const adminApi = {
    getDashboard: () => axiosInstance.get('/admin/dashboard'),
    getTopProducts: (limit = 5) => axiosInstance.get(`/admin/top-products?limit=${limit}`),
    getUsers: () => axiosInstance.get('/admin/users'),
    toggleUserRole: (id) => axiosInstance.put(`/admin/users/${id}/toggle-role`),
    deleteUser: (id) => axiosInstance.delete(`/admin/users/${id}`),
    getAllOrders: (page = 0) => axiosInstance.get(`/orders/admin/all?page=${page}`),
    updateOrderStatus: (id, status) => axiosInstance.put(`/orders/admin/${id}/status?status=${status}`),
    createProduct: (data) => axiosInstance.post('/products', data),
    updateProduct: (id, data) => axiosInstance.put(`/products/${id}`, data),
    deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
    getCategories: () => axiosInstance.get('/categories'),
    createCategory: (data) => axiosInstance.post('/categories', data),
    getCoupons: () => axiosInstance.get('/coupons'),
    createCoupon: (data) => axiosInstance.post('/coupons', data),
    toggleCoupon: (id) => axiosInstance.put(`/coupons/${id}/toggle`),
    deleteCoupon: (id) => axiosInstance.delete(`/coupons/${id}`),
};