import {createSlice} from "@reduxjs/toolkit";

const hallSlice = createSlice({
    name: 'halls',
    initialState: {
        value: []
    },
    reducers: {
        setHalls: (state, action) => {
            state.value = action.payload
        },
    }
})

export const {
    setHalls,
} = hallSlice.actions

export default hallSlice.reducer
