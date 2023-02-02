import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: []
    },
    reducers: {
        updateCart: (state,action) => {
            state.value = action.payload
        },
        removeItem: (state,action) => {
            const itemId = action.payload
            state.value = state.value.filter((item)=> item.id !== itemId)
        },
    },
})

export const { updateCart } = cartSlice.actions
export default cartSlice.reducer