import axiosClient from "../../api/axios-client.js";
import {useDispatch, useSelector} from "react-redux";
import {setHalls} from "../../reducers/admin/halls/slice.js";
import {useState} from "react";

export function OpenSale() {
    const halls = useSelector((state) => state.hallsReducer.value)
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    if (!halls.length) return (
        <p className="conf-step__paragraph">Нет доступных залов для старта продаж</p>
    )

    const isActive = halls[0].active
    const onSubmit = async () => {
        try {
            setError(null)
            const {data} = await axiosClient.post('/toggle-sale', {active: !isActive})
            dispatch(setHalls(data))
        } catch (e) {
            setError(e.response.data)
        }
    }

    return (
        <div className='text-center'>
            <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
            {error}
            <button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>
                {isActive ? 'Закрыть' : 'Открыть'} продажу билетов
            </button>
        </div>
    )
}
