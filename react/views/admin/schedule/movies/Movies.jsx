import {Fragment, useEffect, useState} from "react";
import {Movie} from "./Movie.jsx";
import axiosClient from "../../../../api/axios-client.js";
import {useDispatch, useSelector} from "react-redux";
import {setMovies} from "../../../../reducers/admin/movies/slice.js";
import {Popup} from "../../popups/Popup.jsx";
import {MovieAddPopup} from "../../popups/movie/MovieAddPopup.jsx";

export function Movies() {
	const movies = useSelector((state) => state.moviesReducer.value)
	const dispatch = useDispatch()
	const [isShow, setIsShow] = useState(false)

	const onClose = () => setIsShow(false)
	const onAdd = () => setIsShow(true)

	useEffect(() => {
		axiosClient.get('/movies')
			.then(({data}) => dispatch(setMovies(data)))
	}, [])

	return (
		<Fragment>
			<Popup title='Добавление фильма' isShow={isShow} onClose={onClose}>
				<MovieAddPopup onClose={onClose}/>
			</Popup>
			<p className="conf-step__paragraph">
				<button className="conf-step__button conf-step__button-accent" onClick={onAdd}>
					Добавить фильм
				</button>
			</p>
			<div className="conf-step__movies">
				{movies.map((movie, index) => <Movie movie={movie} key={index}/>)}
			</div>
		</Fragment>
	)
}
