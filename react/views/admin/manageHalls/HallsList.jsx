import {HallsItem} from "./HallsItem";
import {Fragment, useEffect, useState} from "react";
import axiosClient from "../../../api/axios-client.js";
import {useDispatch, useSelector} from "react-redux";
import {setHalls} from "../../../reducers/admin/halls/slice.js";
import {setSelectedHall} from "../../../reducers/admin/configHall/slice.js";
import {Loading} from "../../Loading.jsx";

export function HallsList() {
	const halls = useSelector((state) => state.hallsReducer.value)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const getHalls = async () => {
		setLoading(true)
		try {
			const {data} = await axiosClient.get('/halls')
			setLoading(false)
			dispatch(setHalls(data))
			if (data.length) dispatch(setSelectedHall(data[0]))
		} catch(e) {
			setLoading(false)
		}
	}

	useEffect(() => {
		getHalls();
	}, [])

	if (loading) return <Loading/>

	if (halls.length <= 0) return (
		<p className="conf-step__paragraph">Нет доступных залов</p>
	)

	return (
		<Fragment>
			<p className="conf-step__paragraph">Доступные залы:</p>
			<ul className="conf-step__list">
				{halls.map((hall, index) => <HallsItem hall={hall} key={index}/>)}
			</ul>
		</Fragment>
	)
}
