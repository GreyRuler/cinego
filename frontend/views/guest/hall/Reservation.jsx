import Scheme from "./Scheme";
import ReservationTitle from "./ReservationTitle.jsx";
import {Link, useParams, useSearchParams} from "react-router-dom";
import axiosClient from "../../../api/axios-client.js";
import {useEffect, useState} from "react";
import {Loading} from "../../Loading.jsx";
import {useDispatch} from "react-redux";
import {setTakenPlaces} from "../../../reducers/client/takenPlaces/slice.js";
import classNames from "classnames";

export default function Reservation() {
    const {scheduleId} = useParams()
    const [schedule, setSchedule] = useState({})
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const href = `/schedules/${scheduleId}/payment?${searchParams}`
    const places = searchParams.getAll('places[]')
    const dispatch = useDispatch()
    const classNamesLink = classNames({
        'acception-button': true,
        'disabled': !places.length,
    })

    const getSchedule = async () => {
        setLoading(true)
        try {
            const {data: {data: schedule}} = await axiosClient.get(`/schedules/${scheduleId}`)
            setSchedule(schedule)
            dispatch(setTakenPlaces(schedule.takenPlaces))
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSchedule()
    }, [])

    if (loading) return <Loading/>

    return (
        <section className="buying">
            <ReservationTitle time={schedule.time} hallName={schedule.hall.name} movieName={schedule.movie.name}/>
            <Scheme hall={schedule.hall}/>
            <Link to={href} className={classNamesLink}>Забронировать</Link>
        </section>
    )
}
