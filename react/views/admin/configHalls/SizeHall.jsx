import {Fragment, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCountColumn, setCountRow} from "../../../reducers/admin/configHall/slice.js";

export function SizeHall() {
    const {selectedHall} = useSelector((state) => state.configHallReducer.value)
    const dispatch = useDispatch()
    const refCountRow = useRef(null)
    const refCountColumn = useRef(null)

    const onCountRow = () => dispatch(setCountRow(refCountRow.current.value))
    const onCountColumn = () => dispatch(setCountColumn(refCountColumn.current.value))

    useEffect(() => {
        refCountRow.current.value = selectedHall.countRow
        refCountColumn.current.value = selectedHall.countColumn
        dispatch(setCountRow(refCountRow.current.value))
        dispatch(setCountColumn(refCountColumn.current.value))
    }, [selectedHall])

    return (
        <Fragment>
            <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="conf-step__legend">
                <label className="conf-step__label">Рядов, шт
                    <input type="number" min={1} className="conf-step__input" placeholder="10"
                           onInput={onCountRow} ref={refCountRow}/>
                </label>
                <span className="multiplier">x</span>
                <label className="conf-step__label">Мест, шт
                    <input type="number" min={1} className="conf-step__input" placeholder="8"
                           onInput={onCountColumn} ref={refCountColumn}/>
                </label>
            </div>
        </Fragment>
    )
}
