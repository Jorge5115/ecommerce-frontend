import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/cart');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (item, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/cart/add', item);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/cart/remove/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.delete('/cart/clear');
            return { items: [], total: 0, totalItems: 0 };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        totalItems: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload.items || [];
                state.total = action.payload.total || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items || [];
                state.total = action.payload.total || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload.items || [];
                state.total = action.payload.total || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.total = 0;
                state.totalItems = 0;
            });
    },
});

export default cartSlice.reducer;