import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import sizeReducer from './sizeReducer';
import cartReducer from './cartSlice';
import productSlice from './productSlice';

export const store = configureStore({
    reducer:{
        search: searchReducer,
        size: sizeReducer,
        cart: cartReducer,
        product: productSlice

    }
})
