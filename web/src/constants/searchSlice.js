import { createSlice } from '@reduxjs/toolkit'


export const searchSlice = createSlice({
    name: 'searchResults',
    initialState: {value: []},
    reducers: {
        updateSearchResults: (state,action) => {
            state.value = action.payload
        },
    },
})

export const {updateSearchResults} = searchSlice.actions
export default searchSlice.reducer