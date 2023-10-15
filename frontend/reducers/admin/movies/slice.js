import {createSlice} from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        value: []
    },
    reducers: {
        setMovies: (state, action) => {
            state.value = action.payload
        },
    }
})

export const {
    setMovies,
} = moviesSlice.actions

export default moviesSlice.reducer
