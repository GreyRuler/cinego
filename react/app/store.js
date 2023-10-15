import {configureStore} from "@reduxjs/toolkit";
import navDateReducer from '../reducers/client/navdate/slice'
import hallsReducer from '../reducers/admin/halls/slice'
import moviesReducer from '../reducers/admin/movies/slice'
import configHallReducer from '../reducers/admin/configHall/slice'
import pricesReducer from '../reducers/admin/configPrice/slice'
import scheduleReducer from '../reducers/admin/schedule/slice'
import takenPlacesReducer from '../reducers/client/takenPlaces/slice'

const store = configureStore({
    reducer: {
        navDateReducer,
        hallsReducer,
        configHallReducer,
        pricesReducer,
        moviesReducer,
        scheduleReducer,
        takenPlacesReducer,
    },
})

export default store
