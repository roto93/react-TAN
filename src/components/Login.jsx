import React, { useState } from 'react'
import Upload from './Upload';
import AutoUpload from './AutoUpload';
import { ImCross } from 'react-icons/im'
import { useAuth } from '../hooks/AuthContext';
import { Route } from "react-router-dom";

const Login = () => {
    const { currentUser, signin, signup } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const mode = 'log in'
    // const mode = 'sign in'

    const handleSubmit = (e) => {
        e.preventDefault()
        if (mode === 'sign in') {
            // 註冊模式
            signup().catch(err => setError(err.message))
        } else {
            // 登入模式
            signin(email, password)
                .catch(err => setError(err.message))
                .finally(() => {
                    setEmail('')
                    setPassword('')
                })
        }
    }


    // useEffect(() => {
    //     console.log(currentUser)
    // }, [])

    if (currentUser) return (
        <div className="">

            <Route path="/login" exact>
                <Upload />
            </Route>

            <Route path="/login/auto">
                <AutoUpload />
            </Route>
        </div>
        // <Upload />
    )
    else return (
        <div className="login">
            <div className="container">
                <div className="login__content">
                    <h2 className="login__title">Log in to admin.</h2>
                    {error && <div className="login__error-box">
                        <p className="login__error">{error}</p>
                        <ImCross
                            className="login__error__cross"
                            fill={'Crimson'}
                            onClick={() => { setError('') }}
                        />
                    </div>}
                    <form onSubmit={handleSubmit} className="login__form">

                        <label className="login__label">Email</label>
                        <input
                            type="text"
                            className="login__input"
                            value={email}
                            onChange={changeEmail}
                        />

                        <label className="login__label">Password</label>
                        <input
                            type="password"
                            className="login__input"
                            value={password}
                            onChange={changePassword}
                        />

                        <button className="login__button">log in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
