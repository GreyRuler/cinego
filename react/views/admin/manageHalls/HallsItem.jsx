import {Popup} from "../popups/Popup.jsx";
import {HallEditPopup} from "../popups/hall/HallEditPopup.jsx";
import {useState} from "react";
import {HallDeletePopup} from "../popups/hall/HallDeletePopup.jsx";

export function HallsItem({hall}) {
	const [isShowEdit, setIsShowEdit] = useState(false)
	const [isShowDelete, setIsShowDelete] = useState(false)

	const onCloseEdit = () => setIsShowEdit(false)
	const onCloseDelete = () => setIsShowDelete(false)

	const onDelete = () => setIsShowDelete(true)
	const onEdit = () => setIsShowEdit(true)

	return (
		<li>{hall.name}
			<Popup title='Удаление зала' isShow={isShowDelete} onClose={onCloseDelete}>
				<HallDeletePopup onClose={onCloseDelete} hall={hall}/>
			</Popup>
			<Popup title='Редактирование зала' isShow={isShowEdit} onClose={onCloseEdit}>
				<HallEditPopup onClose={onCloseEdit} hall={hall}/>
			</Popup>
			<button className="conf-step__button conf-step__button-trash"
					onClick={onDelete}>
			</button>
			<button className="conf-step__button conf-step__button-edit"
					onClick={onEdit}>
			</button>
		</li>
	)
}
