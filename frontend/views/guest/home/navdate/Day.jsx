import classNames from "classnames";
import capitalizeFirstLetter from "../../../../utils/capitalizeFirstLetter";
import {useDispatch} from "react-redux";
import {selectDate} from "../../../../reducers/client/navdate/slice";

export default function Day({date, isSelect}) {
    const dispatch = useDispatch()

    const classNameDay = classNames({
        'page-nav__day': true,
        'page-nav__day_today': date < Date.now(),
        'page-nav__day_chosen': isSelect,
    })
    const day = (new Intl.DateTimeFormat('ru', {
        day: 'numeric'
    })).format(date)
    const weekday = (new Intl.DateTimeFormat('ru', {
        weekday: 'short'
    })).format(date)
    const month = (new Intl.DateTimeFormat('ru', {
        month: 'short'
    })).format(date)

    const onSelect = () => dispatch(selectDate(date))

    return (
        <span className={classNameDay} onClick={onSelect}>
            <span className="page-nav__day-week">{capitalizeFirstLetter(month)} {capitalizeFirstLetter(weekday)}</span>
            <span className="page-nav__day-number">{day}</span>
        </span>
    )
}
