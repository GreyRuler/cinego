import {GraphRow} from "./GraphRow.jsx";
import {useSelector} from "react-redux";

export function GraphBody() {
    const {schedule} = useSelector((state) => state.scheduleReducer.value)
    return (
        <tbody>
        {Object.keys(schedule).map((key, index) => (
            <GraphRow key={index} data={schedule[key].data}/>
        ))}
        </tbody>
    )
}
