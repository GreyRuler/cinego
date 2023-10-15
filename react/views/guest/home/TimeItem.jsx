import {Link} from "react-router-dom";

export default function TimeItem({time, scheduleId}) {
    return (
        <li className="movie-seances__time-block">
            <Link to={`/schedules/${scheduleId}/reservation`} className="movie-seances__time">{
                new Date(time).toLocaleTimeString('ru', {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            }</Link>
        </li>
    )
}
