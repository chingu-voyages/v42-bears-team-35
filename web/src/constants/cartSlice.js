import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {value: []},
    reducers: {
        updateCart: (state,action) => {
            state.value = action.payload
        },
    },
})

export const { updateCart } = cartSlice.actions
export default cartSlice.reducer