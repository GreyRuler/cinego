import {Fragment, useEffect, useState} from "react";
import {SchemeRow} from "./SchemeRow";
import {useDispatch, useSelector} from "react-redux";
import axiosClient from "../../../api/axios-client.js";
import {setScheme} from "../../../reducers/admin/configHall/slice.js";
import {Loading} from "../../Loading.jsx";

export function Scheme() {
	const {selectedHall, scheme, countRow, countColumn} = useSelector(
		(state) => state.configHallReducer.value
	)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const queryParams = new URLSearchParams({
		countRow,
		countColumn,
	})

	const getScheme = async () => {
		setLoading(true)
		try {
			const {data} = await axiosClient.get(`/halls/${selectedHall.id}/seats?${queryParams}`)
			setLoading(false)
			dispatch(setScheme(data))
		} catch(e) {
			setLoading(false)
		}
	}

	useEffect(() => {
		getScheme();
	}, [countRow, countColumn, selectedHall])

	return (
		<Fragment>
			<p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
			<div className="conf-step__legend">
				<span className="conf-step__chair conf-step__chair_standard"></span> — обычные кресла
				<span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
				<span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
				<p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
			</div>

			<div className="conf-step__hall">
				<div className="conf-step__hall-wrapper">
					{loading && <Loading/>}
					{!loading && scheme.map((row, index) => <SchemeRow row={row} key={index}/>)}
				</div>
			</div>
		</Fragment>
	)
}
