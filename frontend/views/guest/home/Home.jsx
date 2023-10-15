import {Fragment} from "react";
import NavDate from "./navdate/NavDate";
import Movies from "./Movies";

export default function Home() {
    return (
        <Fragment>
            <NavDate/>
            <Movies/>
        </Fragment>
    )
}
