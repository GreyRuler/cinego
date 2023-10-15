import {Movies} from "./movies/Movies.jsx";
import {Graph} from "./graph/Graph.jsx";
import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axiosClient from "../../../api/axios-client.js";
import {setSchedule} from "../../../reducers/admin/schedule/slice.js";
import {Popup} from "../popups/Popup.jsx";
import {SessionAddPopup} from "../popups/session/SessionAddPopup.jsx";

export function Schedule() {
	const dispatch = useDispatch()
	const [isShow, setIsShow] = useState(false)
	const movies = useSelector((state) => state.moviesReducer.value)
	const halls = useSelector((state) => state.hallsReducer.value)

	const onClose = () => setIsShow(false)
	const onAdd = () => setIsShow(true)

	const getSchedule = async () => {
		const {data} = await axiosClient.get('/schedules')
		dispatch(setSchedule(data))
	}

	useEffect(() => {
		getSchedule()
	}, [movies, halls])

	return (
		<Fragment>
			<Movies/>
			<Popup title='Добавление сеанса' isShow={isShow} onClose={onClose}>
				<SessionAddPopup onClose={onClose}/>
			</Popup>
			<p className="conf-step__paragraph">
				<button className="conf-step__button conf-step__button-accent" onClick={onAdd}>
					Добавить сеанс
				</button>
			</p>
			<Graph/>
		</Fragment>
	)
}
