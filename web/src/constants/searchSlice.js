import { createSlice } from '@reduxjs/toolkit'


export const searchSlice = createSlice({
    name: 'search',
    initialState: {value: ''},
    reducers: {
        updateSearch: (state,action) => {
            state.value = action.payload
        },
    },
})

export const {updateSearch} = searchSlice.actions
export default searchSlice.reducer