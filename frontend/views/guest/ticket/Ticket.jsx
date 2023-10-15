import {TicketDetails} from "../TicketDetails.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../../api/axios-client.js";
import {Loading} from "../../Loading.jsx";

export function Ticket() {
    const {scheduleId} = useParams()
    const [searchParams] = useSearchParams()
    const uuid = searchParams.get('uuid')
    const [ticket, setTicket] = useState({})
    const [qrCode, setQrCode] = useState({})
    const [loading, setLoading] = useState(true)
    const time = new Date(ticket.time).toLocaleTimeString('ru', {
        hour: "2-digit",
        minute: "2-digit",
    })

    const getTickets = async () => {
        setLoading(true)
        try {
            const {data: {ticket, qrCode}} = await axiosClient.get(`/schedules/${scheduleId}/tickets?uuid=${uuid}`)
            setTicket(ticket)
            setQrCode(qrCode)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTickets()
    }, [])

    if (loading) return <Loading/>

    return (
        <main>
            <section className="ticket">

                <header className="tichet__check">
                    <h2 className="ticket__check-title">Электронный билет</h2>
                </header>

                <div className="ticket__info-wrapper">
                    <TicketDetails movieName={ticket.movie.name} time={time} hallName={ticket.hall.name} places={ticket.seats.join(', ')}/>

                    <img className="ticket__info-qr" src={`data:image/png;base64, ${qrCode}`} alt="qrCode"/>

                    <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения
                        бронирования.</p>
                    <p className="ticket__hint">Приятного просмотра!</p>
                </div>
            </section>
        </main>
    )
}
