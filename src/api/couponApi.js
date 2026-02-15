import axiosInstance from './axios';

export const couponApi = {
    validate: (code, cartTotal) =>
        axiosInstance.get(`/coupons/validate?code=${code}&cartTotal=${cartTotal}`),
};