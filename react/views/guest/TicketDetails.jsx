import {Fragment} from "react";

export function TicketDetails({movieName, places, hallName, time}) {
	return (
		<Fragment>
			<p className="ticket__info">
				На фильм: <span className="ticket__details ticket__title">{movieName}</span>
			</p>
			<p className="ticket__info">
				Места: <span className="ticket__details ticket__chairs">{places}</span>
			</p>
			<p className="ticket__info">
				В зале: <span className="ticket__details ticket__hall">{hallName}</span>
			</p>
			<p className="ticket__info">
				Начало сеанса: <span className="ticket__details ticket__start">{time}</span>
			</p>
		</Fragment>
	)
}
