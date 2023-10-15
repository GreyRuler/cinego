import {useDispatch, useSelector} from "react-redux";
import {SessionDeletePopup} from "../../popups/session/SessionDeletePopup.jsx";
import {Popup} from "../../popups/Popup.jsx";
import {Fragment, useState} from "react";
import axiosClient from "../../../../api/axios-client.js";
import {removeTask} from "../../../../reducers/admin/schedule/slice.js";
import {Popover} from "../../popups/Popover.jsx";

export function Task({color, startDate, duration, name, id}) {
    const dispatch = useDispatch()
    const {dateMin} = useSelector((state) => state.scheduleReducer.value)
    const dateMovie = (startDate - dateMin) / (60 * 60 * 1000) * 70
    const width = duration / 60 * 70

    const [isShowPopover, setIsShowPopover] = useState(false)
    const [target, setTarget] = useState(null)
    const [isShow, setIsShow] = useState(false)

    const onClose = () => setIsShow(false)

    const onDelete = () => setIsShow(true)

    const onSubmit = async () => {
        const {data} = await axiosClient.delete(`/schedules/${id}`)
        dispatch(removeTask(data))
        onClose()
    }

    const onTogglePopover = (e) => {
        const {target: element} = e
        setTarget(element)
        setIsShowPopover(prevState => !prevState)
    }

    const timeStart = new Date(startDate).toLocaleTimeString('ru', {
        hour: "2-digit",
        minute: "2-digit",
    })

    return (
        <Fragment>
            <td className='graph-task' style={{
                left: dateMovie,
                width,
                backgroundColor: `#${color}`
            }} onClick={onTogglePopover}>
                <Popup title='Удаление сеанса' isShow={isShow} onClose={onClose}>
                    <SessionDeletePopup onClose={onClose} onSubmit={onSubmit}/>
                </Popup>
                <button className="conf-step__button conf-step__button-trash" onClick={onDelete}></button>
                {isShowPopover && <Popover title={name} target={target}>
                    <p>{`Время начала: ${timeStart}`}</p>
                    <p>{`Длительность: ${duration} минут`}</p>
                </Popover>}
            </td>
        </Fragment>
    )
}
