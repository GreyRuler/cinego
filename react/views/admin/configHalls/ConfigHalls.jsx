import {HallsList} from "./HallsList";
import {SizeHall} from "./SizeHall";
import {Scheme} from "./Scheme";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCountColumn, setCountRow} from "../../../reducers/admin/configHall/slice.js";
import axiosClient from "../../../api/axios-client.js";
import {setHalls} from "../../../reducers/admin/halls/slice.js";

export function ConfigHalls() {
	const halls = useSelector((state) => state.hallsReducer.value)
	const {selectedHall, countRow, countColumn, scheme} = useSelector(
		(state) => state.configHallReducer.value
	)
	const dispatch = useDispatch()

	const onCancel = () => {
		dispatch(setCountRow(selectedHall.countRow))
		dispatch(setCountColumn(selectedHall.countColumn))
	}

	const onSubmit = async () => {
		const {data: halls} = await axiosClient.post(`/halls/${selectedHall.id}/seats`, {
			scheme,
			countRow,
			countColumn,
		})
		dispatch(setHalls(halls))
	}

	return (
		<Fragment>
			<HallsList halls={halls}/>
			{selectedHall && <SizeHall/>}
			{selectedHall && countRow && countColumn && <Fragment>
				<Scheme/>
				<fieldset className="conf-step__buttons text-center">
					<button className="conf-step__button conf-step__button-regular"
							onClick={onCancel}>
						Отмена
					</button>
					<button className="conf-step__button conf-step__button-accent"
							onClick={onSubmit}>
						Сохранить
					</button>
				</fieldset>
			</Fragment>}
		</Fragment>
	)
}
