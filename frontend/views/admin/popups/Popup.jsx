import classNames from "classnames";

export function Popup({title, isShow, onClose, children}) {
	const classNamesPopup = classNames({
		'popup': true,
		'active': isShow,
	})
	return (
		<div className={classNamesPopup}>
			<div className="popup__container">
				<div className="popup__content">
					<div className="popup__header">
						<h2 className="popup__title">
							{title}
							<span className="popup__dismiss" onClick={onClose}>
								Закрыть
							</span>
						</h2>
					</div>
					<div className="popup__wrapper">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}
