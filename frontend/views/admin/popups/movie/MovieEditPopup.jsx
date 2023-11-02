import {Fragment, useRef} from "react";
import axiosClient from "../../../../api/axios-client.js";
import {useDispatch} from "react-redux";
import {setHalls} from "../../../../reducers/admin/halls/slice.js";
import {setMovies} from "../../../../reducers/admin/movies/slice.js";
import {Input} from "../Input.jsx";
import {InputFile} from "../InputFile.jsx";

export function MovieEditPopup({movie, onClose}) {
	const dispatch = useDispatch()
	const name = useRef(null)
	const description = useRef(null)
	const duration = useRef(null)
	const origin = useRef(null)
	const file = useRef(null)

	const form = () => {
		const items = {
			name: name.current.value,
			description: description.current.value,
			duration: duration.current.value,
			origin: origin.current.value,
			file: file.current.files[0],
		}
		const formData = new FormData()
		for (const [key, value] of Object.entries(items)) {
			formData.append(key, value)
		}
		formData.append('_method', 'PUT')
		return formData
	}

	const onSubmit = async () => {
		await axiosClient.post(`/movies/${movie.id}`, form())
		const {data} = await axiosClient.get('/movies')
		dispatch(setMovies(data))
		onClose()
	}

	return (
		<Fragment>
			<Input refInput={name} attrName={'name'} title={'Название фильма'} value={movie.name}/>
			<Input refInput={description} attrName={'description'} title={'Описание фильма'} value={movie.description}/>
			<Input refInput={duration} attrName={'duration'} title={'Длительность фильма'} type={'number'} value={movie.duration}/>
			<Input refInput={origin} attrName={'origin'} title={'Страна выпуска'} value={movie.origin}/>
			<InputFile refInput={file} attrName={'file'} title={'Постер для фильма'} url={movie.image}/>
			<div className="conf-step__buttons text-center">
				<button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>Сохранить</button>
				<button className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</button>
			</div>
		</Fragment>
	)
}
