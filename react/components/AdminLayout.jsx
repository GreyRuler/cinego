import {Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import '../assets/css/admin.css';
import '../assets/css/graph.css';
import '../assets/css/popover.css';
import axiosClient from "../api/axios-client.js";

export default function AdminLayout() {
    const {token, setToken} = useStateContext();

    const onLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/logout')
          .then(() => {
            setToken(null)
          })
    }

    return (
        <div id="defaultLayout">
            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                <div className="page-header__container-subtitle">
                    <span className="page-header__subtitle">Администраторррская</span>
                    {token && <span className="page-header__subtitle" onClick={onLogout}>Выйти</span>}
                </div>
            </header>
            <Outlet/>
        </div>
    )
}
