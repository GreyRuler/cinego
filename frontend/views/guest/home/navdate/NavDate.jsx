import Arrow from "./Arrow";
import {useDispatch, useSelector} from "react-redux";
import Day from "./Day";
import {prev, next} from "../../../../reducers/client/navdate/slice";

export default function NavDate() {
    const {date, selectDate} = useSelector((state) => state.navDateReducer.value)
    const dispatch = useDispatch()
    const isToday = date < Date.now()
    const lastDate = date + 24 * 60 * 60 * 1000 * (7 - !isToday)
    const visibleSelectDate = date < (selectDate + isToday) && selectDate < lastDate
    const length = 7 - !isToday - visibleSelectDate
    return (
        <nav className="page-nav">
            <Arrow isNext={false} isToday={isToday} onClick={() => dispatch(prev())}/>
            {Array.from({length}, (_, i) => {
                const temp = date + 24 * 60 * 60 * 1000 * (i + !isToday)
                return <Day date={temp} key={i} isSelect={temp === selectDate}/>
            })}
            <Arrow isNext={true} onClick={() => dispatch(next())}/>
        </nav>
    )
}
