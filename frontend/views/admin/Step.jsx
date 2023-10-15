import classNames from "classnames";
import {useState} from "react";

export const Step = ({title, children}) => {
	const [isCollapse, setCollapse] = useState(true)
	const classNamesStep = classNames({
		'conf-step__header': true,
		'conf-step__header_opened': isCollapse,
		'conf-step__header_closed': !isCollapse,
	})
	return (
		<section className="conf-step">
			<header className={classNamesStep} onClick={() => setCollapse(!isCollapse)}>
				<h2 className="conf-step__title">{title}</h2>
			</header>
			<div className="conf-step__wrapper">
				{children}
			</div>
		</section>
	)
}
