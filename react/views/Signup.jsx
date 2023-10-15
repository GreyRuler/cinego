import {Link, Navigate} from "react-router-dom";
import {createRef, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../api/axios-client.js";

export default function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const {token, setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)

    if (token) return <Navigate to="/admin"/>

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <main>
            <section className="login">
                <header className="login__header">
                    <h2 className="login__title">Регистрация</h2>
                </header>
                <div className="login__wrapper">
                    <form className="login__form" onSubmit={onSubmit}>
                        {errors &&
                            <div className="alert">
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        }
                        <label className="login__label" htmlFor="name">
                            Ваше имя
                            <input className="login__input" type="text" name="name"
                                   required ref={nameRef}/>
                        </label>
                        <label className="login__label" htmlFor="mail">
                            E-mail
                            <input className="login__input" type="mail" placeholder="example@domain.xyz" name="mail"
                                   required ref={emailRef}/>
                        </label>
                        <label className="login__label" htmlFor="pwd">
                            Пароль
                            <input className="login__input"  ref={passwordRef} type="password" placeholder="Password"/>
                        </label>
                        <label className="login__label" htmlFor="pwd">
                            Повторите пароль
                            <input className="login__input" ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
                        </label>
                        <p className="login__label">Зарегистрированы? <Link to="/admin/login">Авторизуйтесь</Link></p>
                        <div className="text-center">
                            <input value="Зарегистрироваться" type="submit" className="login__button"/>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}
