import {HallsList} from "../configHalls/HallsList.jsx";
import {useSelector} from "react-redux";
import {Fragment} from "react";
import {ConfigPriceForm} from "./ConfigPriceForm.jsx";

export function ConfigPrice() {
    const {selectedHall} = useSelector((state) => state.configHallReducer.value)

    return (
        <Fragment>
            <HallsList/>
            {selectedHall && <ConfigPriceForm/>}
        </Fragment>
    )
}
