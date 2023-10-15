import {createSlice} from "@reduxjs/toolkit";

const configHallSlice = createSlice({
    name: 'configHall',
    initialState: {
        value: {
            selectedHall: null,
            countRow: null,
            countColumn: null,
            scheme: [],
        }
    },
    reducers: {
        setSelectedHall: (state, action) => {
            state.value = {
                ...state.value,
                selectedHall: action.payload,
            }
        },
        setCountRow: (state, action) => {
            state.value = {
                ...state.value,
                countRow: action.payload,
            }

        },
        setCountColumn: (state, action) => {
            state.value = {
                ...state.value,
                countColumn: action.payload
            }
        },
        setScheme: (state, action) => {
            state.value = {
                ...state.value,
                scheme: action.payload,
            }
        },
        setTypePlace: (state, action) => {
            const {scheme} = state.value
            scheme[action.payload.row][action.payload.column] = action.payload
            state.value = {
                ...state.value,
                scheme
            }
        },
    }
})

export const {
    setSelectedHall,
    setCountRow,
    setCountColumn,
    setScheme,
    setTypePlace,
} = configHallSlice.actions

export default configHallSlice.reducer
