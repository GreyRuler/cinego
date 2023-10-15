import {HallsItem} from "./HallsItem";
import {Fragment} from "react";
import {useSelector} from "react-redux";

export function HallsList() {
	const halls = useSelector((state) => state.hallsReducer.value)

	return (
		<Fragment>
			<p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
			<ul className="conf-step__selectors-box">
				{halls.map((hall, index) => (
					<HallsItem hall={hall} key={index}/>
				))}
			</ul>
		</Fragment>
	)
}
