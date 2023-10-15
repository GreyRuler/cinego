export default function ReservationTitle({movieName, hallName, time}) {
    return (
        <div className="buying__info">
            <div className="buying__info-description">
                <h2 className="buying__info-title">{movieName}</h2>
                <p className="buying__info-start">Начало сеанса: {
                    new Date(time).toLocaleTimeString('ru', {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                }</p>
                <p className="buying__info-hall">{hallName}</p>
            </div>
            <div className="buying__info-hint">
                <p>Тапните дважды,<br/>чтобы увеличить</p>
            </div>
        </div>
    )
}
