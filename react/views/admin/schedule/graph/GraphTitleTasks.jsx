import {GraphTitleTask} from "./GraphTitleTask.jsx";
import {useSelector} from "react-redux";

export function GraphTitleTasks() {
	const {schedule} = useSelector((state) => state.scheduleReducer.value)
	return (
		<div className='graph-title-tasks'>
			<div className='title'>Название зала</div>
			{Object.keys(schedule).map((key, index) => (
				<GraphTitleTask task={schedule[key]} key={index}/>
			))}
		</div>
	)
}
