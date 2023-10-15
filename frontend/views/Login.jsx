import {Link, Navigate} from "react-router-dom";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import {useState} from "react";
import axiosClient from "../api/axios-client.js";

export default function Login() {
    const emailRef = createRef()
    const passwordRef = createRef()
    const {token, setUser, setToken} = useStateContext()
    const [message, setMessage] = useState(null)

    if (token) return <Navigate to="/admin"/>

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message)
                }
            })
    }

    return (
        <main>
            <section className="login">
                <header className="login__header">
                    <h2 className="login__title">Авторизация</h2>
                </header>
                <div className="login__wrapper">
                    <form className="login__form" onSubmit={onSubmit}>
                        {message &&
                            <div className="alert">
                                <p>{message}</p>
                            </div>
                        }
                        <label className="login__label" htmlFor="mail">
                            E-mail
                            <input className="login__input" type="mail" placeholder="example@domain.xyz" name="mail"
                                   required ref={emailRef}/>
                        </label>
                        <label className="login__label" htmlFor="pwd">
                            Пароль
                            <input className="login__input" type="password" placeholder="" name="pwd" required ref={passwordRef}/>
                        </label>
                        <p className="login__label">Не зарегистрированы? <Link to="/admin/signup">Создайте аккаунт</Link></p>
                        <div className="text-center">
                            <input value="Авторизоваться" type="submit" className="login__button"/>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}
