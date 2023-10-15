import {Task} from "./Task.jsx";
import {useSelector} from "react-redux";

export function GraphRow({data}) {
	const {countHour} = useSelector((state) => state.scheduleReducer.value)

	return (
		<tr>
			{Array.from({length: countHour}, (_, i) => (
				<td key={i}><div className={'slug'}></div></td>
			))}
			{Object.keys(data).map((key, index) => (
				<Task key={index} id={key} {...data[key]}/>
			))}
		</tr>
	)
}
