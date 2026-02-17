import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import { fetchCart } from '../features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
});

const state = store.getState();
if (state.auth.token) {
    store.dispatch(fetchCart());
}

export default store;