import {useDispatch, useSelector} from "react-redux";
import axiosClient from "../../../../api/axios-client.js";
import {Input} from "../Input.jsx";
import {Fragment, useRef, useState} from "react";
import {Select} from "../Select.jsx";
import {addTask} from "../../../../reducers/admin/schedule/slice.js";

export function SessionAddPopup({onClose}) {
	const dispatch = useDispatch()
	const halls = useSelector((state) => state.hallsReducer.value)
	const movies = useSelector((state) => state.moviesReducer.value)
	const hall = useRef(null)
	const movie = useRef(null)
	const time = useRef(null)
	const [error, setError] = useState(null)

	const form = () => {
		const items = {
			hall_id: hall.current.value,
			movie_id: movie.current.value,
			time: Date.parse(time.current.value),
		}
		const formData = new FormData()
		for (const [key, value] of Object.entries(items)) {
			formData.append(key, value)
		}
		return formData
	}

	const onSubmit = async () => {
		try {
			const {data} = await axiosClient.post('/schedules', form())
			setError(null)
			dispatch(addTask(data))
			onClose()
		} catch (error) {
			if (error.response.status === 422) {
				const options = {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				};
				const format = new Intl.DateTimeFormat('ru', options)
				const dateStart = new Date(error.response.data.startTime)
				const dateEnd = new Date(error.response.data.endTime)
				setError(`Сеанс пересекается с другим сеансом (${format.format(dateStart)} - ${format.format(dateEnd)})`)
			} else {
				console.error('Error:', error);
			}
		}
	}

	return (
		<Fragment>
			<Select refSelect={hall} attrName={'hall'} title={'Выберите зал'} list={halls}/>
			<Select refSelect={movie} attrName={'movie'} title={'Выберите фильм'} list={movies}/>
			<Input refInput={time} attrName={'time'} title={'Время начала сеанса'} type={'datetime-local'}/>
			{error && <p className="conf-step__paragraph error">{error}</p>}
			<div className="conf-step__buttons text-center">
				<button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>Добавить сеанс</button>
				<button className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</button>
			</div>
		</Fragment>
	)
}
