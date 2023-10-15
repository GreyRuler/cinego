import {Fragment, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axiosClient from "../../../api/axios-client.js";
import {TicketDetails} from "../TicketDetails.jsx";

export function PaymentTitle({movieName, hall, time}) {
    const [searchParams] = useSearchParams()
    const [amount, setAmount] = useState(null)
    const places = searchParams.getAll('places[]')

    useEffect(() => {
        const getAmount = async () => {
            const {data} = await axiosClient.get(`/halls/${hall.id}/amount?${searchParams}`)
            setAmount(data)
        }
        getAmount()
    }, [])

    return (
        <Fragment>
            <TicketDetails movieName={movieName} time={time} hallName={hall.name} places={places.join(', ')}/>
            <p className="ticket__info">
                Стоимость: <span className="ticket__details ticket__cost">{amount}</span> рублей
            </p>
        </Fragment>
    )
}
