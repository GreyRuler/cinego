import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../../api/axios-client.js";
import {Loading} from "../../Loading.jsx";
import {PaymentTitle} from "./PaymentTitle.jsx";

export function Payment() {
    const {scheduleId} = useParams()
    const [schedule, setSchedule] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams()
    const time = new Date(schedule.time).toLocaleTimeString('ru', {
        hour: "2-digit",
        minute: "2-digit",
    })
    const navigate = useNavigate()

    const getSchedule = async () => {
        setLoading(true)
        try {
            const {data: {data: schedule}} = await axiosClient.get(`/schedules/${scheduleId}`)
            setSchedule(schedule)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setError(e)
            setLoading(false)
        }
    }

    const onSubmit = async () => {
        try {
            const {data: {uuid}} = await axiosClient.post(`/schedules/${scheduleId}/tickets?${searchParams}`)
            navigate(`/schedules/${scheduleId}/tickets?uuid=${uuid}`)
        } catch (e) {
            console.log(e)
            setError(e.response.data)
        }
    }

    useEffect(() => {
        getSchedule()
    }, [])

    if (loading) return <Loading/>

    return (
        <section className="ticket">
            <header className="tichet__check">
                <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
            </header>
            <div className="ticket__info-wrapper">
                <PaymentTitle hall={schedule.hall} movieName={schedule.movie.name} time={time}/>

                <button className="acception-button" onClick={onSubmit}>Получить код бронирования</button>
                {error}
                <p className="ticket__hint">
                    После оплаты билет будет доступен в этом окне, а также придёт вам на почту.
                    Покажите QR-код нашему контроллёру у входа в зал.
                </p>
                <p className="ticket__hint">Приятного просмотра!</p>
            </div>
        </section>
    )
}
