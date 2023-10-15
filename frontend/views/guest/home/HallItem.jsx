import TimeItem from "./TimeItem";

export default function HallItem({hall}) {
    return (
        <div className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">{hall.name}</h3>
            <ul className="movie-seances__list">
                {Object.entries(hall.times).map(([scheduleId, time], index) => (
                    <TimeItem time={time} scheduleId={scheduleId} key={index}/>
                ))}
            </ul>
        </div>
    )
}
