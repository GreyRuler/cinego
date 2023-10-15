import {Step} from "./Step";
import {ManageHalls} from "./manageHalls/ManageHalls";
import {ConfigHalls} from "./configHalls/ConfigHalls";
import {ConfigPrice} from "./configPrice/ConfigPrice.jsx";
import {Schedule} from "./schedule/Schedule.jsx";
import {OpenSale} from "./OpenSale";
import {Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export function Steps() {
    const {token} = useStateContext();

    if (!token) return <Navigate to="/admin/login"/>

    return (
        <main className="conf-steps">
            <Step title='Управление залами'>
                <ManageHalls/>
            </Step>
            <Step title='Конфигурация залов'>
                <ConfigHalls/>
            </Step>
            <Step title='Конфигурация цен'>
                <ConfigPrice/>
            </Step>
            <Step title='Сетка сеансов'>
                <Schedule/>
            </Step>
            <Step title='Открыть продажи'>
                <OpenSale/>
            </Step>
        </main>
    )
}
