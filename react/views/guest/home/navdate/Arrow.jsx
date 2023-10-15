import {Link} from "react-router-dom";
import classNames from "classnames";

export default function Arrow({isNext, isToday, onClick}) {
    if (!isNext && isToday) return
    const classNameArrow = classNames({
        "page-nav__day": true,
        'page-nav__day_arrow': true,
        'page-nav__day_next': isNext,
        'page-nav__day_prev': !isNext,
    })
    return (
        <span className={classNameArrow} onClick={onClick}></span>
    )
}
