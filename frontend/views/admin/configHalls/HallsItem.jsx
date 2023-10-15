import {useDispatch, useSelector} from "react-redux";
import {setSelectedHall} from "../../../reducers/admin/configHall/slice.js";

export function HallsItem({hall}) {
    const {selectedHall} = useSelector((state) => state.configHallReducer.value)
    const dispatch = useDispatch()

    const onSelect = () => dispatch(setSelectedHall(hall))

    return (
        <li><input type="checkbox" onChange={onSelect}
                   className="conf-step__radio" name="chairs-hall"
                   checked={selectedHall?.name === hall.name}/>
            <span className="conf-step__selector">{hall.name}</span>
        </li>
    )
}
