import {createBrowserRouter} from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import AdminLayout from "./components/AdminLayout";
import Reservation from "./views/guest/hall/Reservation.jsx";
import Home from "./views/guest/home/Home";
import {Steps} from "./views/admin/Steps.jsx";
import {Payment} from "./views/guest/payment/Payment.jsx";
import {Ticket} from "./views/guest/ticket/Ticket.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/schedules/:scheduleId',
                children: [
                    {
                        path: 'reservation',
                        element: <Reservation/>,
                    },
                    {
                        path: 'payment',
                        element: <Payment/>,
                    },
                    {
                        path: 'tickets',
                        element: <Ticket/>,
                    }
                ]
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                path: '',
                element: <Steps/>,
            },
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'signup',
                element: <Signup/>,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default router;
