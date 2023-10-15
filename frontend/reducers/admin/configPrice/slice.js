import {createSlice} from "@reduxjs/toolkit";

const pricesSlice = createSlice({
    name: 'prices',
    initialState: {
        value: {
            standard: null,
            vip: null
        }
    },
    reducers: {
        setPrices: (state, action) => {
            state.value = {
                ...action.payload
            }
        },
        setPrice: (state, action) => {
            state.value[action.payload.name] = action.payload.price
        },
    }
})

export const {
    setPrices,
    setPrice,
} = pricesSlice.actions

export default pricesSlice.reducer
