import {createSlice} from "@reduxjs/toolkit";
import roundDateToHour from "../../../utils/roundDate.js";

const navDateSlice = createSlice({
    name: 'navDate',
    initialState: {
        value: {
            date: roundDateToHour(Date.now(), 0),
            selectDate: roundDateToHour(Date.now(), 0)
        }
    },
    reducers: {
        next: (state) => {
            state.value = {
                ...state.value,
                date: state.value.date += 24 * 60 * 60 * 1000
            }
        },
        prev: (state) => {
            state.value = {
                ...state.value,
                date: state.value.date -= 24 * 60 * 60 * 1000
            }
        },
        selectDate: (state, action) => {
            state.value = {
                ...state.value,
                selectDate: action.payload
            }
        }
    }
})

export const {
    prev,
    next,
    selectDate,
} = navDateSlice.actions

export default navDateSlice.reducer
