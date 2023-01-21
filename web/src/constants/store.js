import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import sizeReducer from './sizeReducer';

export const store = configureStore({
    reducer:{
        search: searchReducer,
        size: sizeReducer
    }
})
