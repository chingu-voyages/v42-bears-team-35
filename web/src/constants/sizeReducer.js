import { createSlice } from '@reduxjs/toolkit'

export const sizeReducer = createSlice({
    name: 'size',
    initialState: {value: {height: 0, width: 0}},
    reducers: {
        updateSize: (state,action) => {

            state.value = action.payload
        },
    },
})

export const {updateSize} = sizeReducer.actions
export default sizeReducer.reducer