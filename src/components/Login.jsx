import React, { useState, useEffect } from 'react'
import { auth } from '../firebase';
import Upload from './Upload';
import { ImCross } from 'react-icons/im'
import { useAuth } from '../hooks/AuthContext';

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode == 'sign in') {
            // 註冊模式
            try {
                await signup()

                console.log('Sign up a new user successfully.')
            } catch (err) {
                setError(err.message)
            }
        } else {
            // 登入模式
            try {
                await signin(email, password)
                // const userCredential = await auth.signInWithEmailAndPassword(email, password)
                // const user = userCredential.user
                // console.log(`Logged in successfully with ${user.email}`)
            } catch (err) {
                setError(err.message)
            } finally {
                setEmail('')
                setPassword('')
            }
        }
    }


    useEffect(() => {
        console.log(currentUser)
    }, [])

    if (currentUser) return <Upload />
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
