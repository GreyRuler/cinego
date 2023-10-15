import {createSlice} from "@reduxjs/toolkit";

const takenPlacesSlice = createSlice({
    name: 'takenPlaces',
    initialState: {
        value: []
    },
    reducers: {
        setTakenPlaces: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {
    setTakenPlaces,
} = takenPlacesSlice.actions

export default takenPlacesSlice.reducer
