import {GraphTitleTasks} from "./GraphTitleTasks.jsx";
import {useDispatch, useSelector} from "react-redux";
import {GraphHeader} from "./GraphHeader.jsx";
import {GraphBody} from "./GraphBody.jsx";
import axiosClient from "../../../../api/axios-client.js";
import {useEffect} from "react";
import {setRange} from "../../../../reducers/admin/schedule/slice.js";

export function Graph() {
    const dispatch = useDispatch()
    const {schedule, countHour} = useSelector((state) => state.scheduleReducer.value)

    const getRange = async () => {
        const {data: {dateMin, dateMax}} = await axiosClient.get('/schedules/range')
        dispatch(setRange({dateMin, dateMax}))
    }

    useEffect(() => {
        getRange()
    }, [schedule])

    if (!countHour) return (
        <p className="conf-step__paragraph">Нет сеансов</p>
    )

    return (
        <div className='graph-container'>
            <GraphTitleTasks/>
            <div className='graph'>
                <table>
                    <GraphHeader/>
                    <GraphBody/>
                </table>
            </div>
        </div>
    )
}
