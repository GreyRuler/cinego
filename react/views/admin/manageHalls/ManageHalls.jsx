import {HallsList} from "./HallsList";
import {Fragment, useState} from "react";
import {Popup} from "../popups/Popup.jsx";
import {HallAddPopup} from "../popups/hall/HallAddPopup.jsx";

export function ManageHalls() {
	const [isShow, setIsShow] = useState(false)
	const onShow = () => setIsShow(true)
	const onClose = () => setIsShow(false)

	return (
		<Fragment>
			<Popup title='Добавление зала' isShow={isShow} onClose={onClose}>
				<HallAddPopup onClose={onClose}/>
			</Popup>
			<HallsList/>
			<button className="conf-step__button conf-step__button-accent"
					onClick={onShow}>
				Создать зал
			</button>
		</Fragment>
	)
}
