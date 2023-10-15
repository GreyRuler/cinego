import {Fragment} from "react";
import {useDispatch} from "react-redux";
import axiosClient from "../../../../api/axios-client.js";
import {setHalls} from "../../../../reducers/admin/halls/slice.js";

export function HallDeletePopup({hall, onClose}) {
	const dispatch = useDispatch()

	const onSubmit = async () => {
		await axiosClient.delete(`/halls/${hall.id}`)
		const {data} = await axiosClient.get('/halls')
		dispatch(setHalls(data))
		onClose()
	}

	return (
		<Fragment>
			<p className="conf-step__paragraph">
				Вы действительно хотите удалить зал <span>{hall.name}</span>?
			</p>
			<div className="conf-step__buttons text-center">
				<button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>Удалить</button>
				<button className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</button>
			</div>
		</Fragment>
	)
}
