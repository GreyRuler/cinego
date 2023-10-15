import {Fragment, useRef} from "react";
import axiosClient from "../../../../api/axios-client.js";
import {useDispatch} from "react-redux";
import {setHalls} from "../../../../reducers/admin/halls/slice.js";

export function HallEditPopup({hall, onClose}) {
	const dispatch = useDispatch()
	const name = useRef(null)

	const onSubmit = async () => {
		await axiosClient.put(`/halls/${hall.id}`, {
			name: name.current.value
		})
		const {data} = await axiosClient.get('/halls')
		dispatch(setHalls(data))
		onClose()
	}

	return (
		<Fragment>
			<label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
				Название зала
				<input className="conf-step__input" id="name" type="text" ref={name} defaultValue={hall.name}
					   placeholder="Например, &laquo;Зал 1&raquo;" name="name" required/>
			</label>
			<div className="conf-step__buttons text-center">
				<button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>Сохранить</button>
				<button className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</button>
			</div>
		</Fragment>
	)
}
