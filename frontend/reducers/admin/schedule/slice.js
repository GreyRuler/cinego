import {createSlice} from "@reduxjs/toolkit";
import roundDateToHour from "../../../utils/roundDate.js";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        value: {
            schedule: [],
            dateMin: null,
            dateMax: null,
            countHour: null,
        }
    },
    reducers: {
        setSchedule: (state, action) => {
            state.value = {
                ...state.value,
                schedule: action.payload,
            }
        },
        setRange: (state, action) => {
            const {dateMin, dateMax} = action.payload
            const roundDateMin = roundDateToHour(dateMin, 0)
            const roundDateMax = roundDateToHour(dateMax, 24)
            const countHour = (roundDateMax - roundDateMin) / (60 * 60 * 1000)

            state.value = {
                ...state.value,
                dateMin: roundDateMin,
                dateMax: roundDateMax,
                countHour: !dateMin || !dateMax ? null : countHour,
            }
        },
        addTask: (state, action) => {
            const task = action.payload
            state.value.schedule[task.hall_id].data[task.id] = task
        },
        removeTask: (state, action) => {
            const task = action.payload
            delete state.value.schedule[task.hall_id].data[task.id]
        },
    }
})

export const {
    setSchedule,
    setRange,
    addTask,
    removeTask,
} = scheduleSlice.actions

export default scheduleSlice.reducer
