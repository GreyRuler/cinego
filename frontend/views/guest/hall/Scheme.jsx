import SchemeRow from "./SchemeRow";
import axiosClient from "../../../api/axios-client.js";
import {useEffect, useState} from "react";
import {Loading} from "../../Loading.jsx";

export default function Scheme({hall}) {
    const [scheme, setScheme] = useState([])
    const [loading, setLoading] = useState(false)
    const queryParams = new URLSearchParams({
        countRow: hall.countRow,
        countColumn: hall.countColumn,
    })

    const getScheme = async () => {
        setLoading(true)
        try {
            const {data} = await axiosClient.get(`/halls/${hall.id}/seats?${queryParams}`)
            setLoading(false)
            setScheme(data)
        } catch(e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getScheme()
    }, [])

    if (loading) return <Loading/>

    return (
        <div className="buying-scheme">
            <div className="buying-scheme__wrapper">{
                scheme.map((row, index) => <SchemeRow row={row} key={index}/>)
            }</div>
            <div className="buying-scheme__legend">
                <div className="col">
                    <p className="buying-scheme__legend-price"><span
                        className="buying-scheme__chair buying-scheme__chair_standard"></span> Свободно (<span
                        className="buying-scheme__legend-value">250</span>руб)</p>
                    <p className="buying-scheme__legend-price"><span
                        className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span
                        className="buying-scheme__legend-value">350</span>руб)</p>
                </div>
                <div className="col">
                    <p className="buying-scheme__legend-price"><span
                        className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                    <p className="buying-scheme__legend-price"><span
                        className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
                </div>
            </div>
        </div>
    )
}
