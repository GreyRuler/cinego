import classNames from "classnames";
import {setTypePlace} from "../../../reducers/admin/configHall/slice.js";
import {useDispatch} from "react-redux";

function loopState(state, states) {
	let index = states.indexOf(state)
	return states[index === states.length - 1 ? 0 : ++index]
}

export function SchemeCell({cell}) {
	const dispatch = useDispatch()
	const classNameCell = classNames({
		'conf-step__chair': true,
		'conf-step__chair_disabled': cell.type_place === 'disabled',
		'conf-step__chair_standard': cell.type_place === 'standard',
		'conf-step__chair_vip': cell.type_place === 'vip',
	})
	const types = [
		'disabled',
		'standard',
		'vip',
	]

	const onChangeType = () => {
		dispatch(setTypePlace({
			...cell,
			type_place: loopState(cell.type_place, types)
		}))
	}

	return (
		<span className={classNameCell} onClick={onChangeType}></span>
	)
}
