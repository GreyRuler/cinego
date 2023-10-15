import {Fragment} from "react";
import {useDispatch} from "react-redux";
import axiosClient from "../../../../api/axios-client.js";
import {setMovies} from "../../../../reducers/admin/movies/slice.js";

export function MovieDeletePopup({movie, onClose}) {
	const dispatch = useDispatch()

	const onSubmit = async () => {
		await axiosClient.delete(`/movies/${movie.id}`)
		const {data} = await axiosClient.get('/movies')
		dispatch(setMovies(data))
		onClose()
	}

	return (
		<Fragment>
			<p className="conf-step__paragraph">
				Вы действительно хотите удалить фильм <span>{movie.name}</span>?
			</p>
			<div className="conf-step__buttons text-center">
				<button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>Удалить</button>
				<button className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</button>
			</div>
		</Fragment>
	)
}
