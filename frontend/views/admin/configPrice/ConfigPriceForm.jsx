import {Fragment, useEffect} from "react";
import {ConfigPriceInput} from "./ConfigPriceInput.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setPrices} from "../../../reducers/admin/configPrice/slice.js";
import axiosClient from "../../../api/axios-client.js";

export function ConfigPriceForm() {
    const {selectedHall} = useSelector((state) => state.configHallReducer.value)
    const prices = useSelector((state) => state.pricesReducer.value)
    const dispatch = useDispatch()

    const getPrices = async () => {
        const {data} = await axiosClient.get(`/halls/${selectedHall.id}/typePlaces`)
        dispatch(setPrices(data))
    }
    const onCancel = async () => await getPrices()
    const onSave = async () => {
        await axiosClient.post(`/halls/${selectedHall.id}/typePlaces`, prices)
    }

    useEffect(() => {
        getPrices()
    }, [selectedHall])

    return (
        <Fragment>
            <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
            <ConfigPriceInput price={prices.standard} seatName='обычные' type='standard'/>
            <ConfigPriceInput price={prices.vip} seatName='VIP' type='vip'/>
            <fieldset className="conf-step__buttons text-center">
                <button className="conf-step__button conf-step__button-regular" onClick={onCancel}>Отмена</button>
                <button className="conf-step__button conf-step__button-accent" onClick={onSave}>Сохранить</button>
            </fieldset>
        </Fragment>
    )
}
