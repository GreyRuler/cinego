import {Outlet} from "react-router-dom";
import {Fragment} from "react";
import '../assets/css/client.css';

export default function GuestLayout() {
    return (
        <Fragment>
            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
            </header>
            <div id="guestLayout">
                <main><Outlet/></main>
            </div>
        </Fragment>
    );
}
