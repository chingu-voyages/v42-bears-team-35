import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';


export const store = configureStore({
    reducer:{
        searchResults: searchReducer
    }
})
