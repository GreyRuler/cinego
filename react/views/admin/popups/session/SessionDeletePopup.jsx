import {Fragment} from "react";

export function SessionDeletePopup({onClose, onSubmit}) {
	return (
		<Fragment>
			<p className="conf-step__paragraph">
				Вы действительно хотите сеанс?
			</p>
			<div className="conf-step__buttons text-center">
				<button className="conf-step__button conf-step__button-accent" onClick={onSubmit}>Удалить</button>
				<button className="conf-step__button conf-step__button-regular" onClick={onClose}>Отменить</button>
			</div>
		</Fragment>
	)
}
