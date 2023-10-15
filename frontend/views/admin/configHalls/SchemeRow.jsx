import {SchemeCell} from "./SchemeCell";

export function SchemeRow({row}) {
	return (
		<div className="conf-step__row">
			{row.map((cell, index) => <SchemeCell cell={cell} key={index}/>)}
		</div>
	)
}
