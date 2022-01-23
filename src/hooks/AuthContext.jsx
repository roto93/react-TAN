import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

// useContext 取值
export const useAuth = () => useContext(AuthContext)

// Provider 給值
export const AuthProvider = ({ children }) => {

    // user 物件
    const [currentUser, setCurrentUser] = useState({})

    // username 
    const [username, setUsername] = useState('');

    // 註冊
    const signup = (email, passward) => {
        return auth.createUserWithEmailAndPassword(email, passward)
    }

    // 登入
    const signin = (email, passward) => {
        return auth.signInWithEmailAndPassword(email, passward)
    }

    // 登出
    const signout = () => {
        return auth.signOut()
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if (user) {
                const _username = user.email.split('@')[0]
                setUsername(_username)
                // console.log(`Logged in as ${_username}`)
            } else {
                setUsername('')
                // console.log(`User has logged out.`)
            }
        })
        return unsubscribe
    }, [])



    const value = {
        currentUser,
        username,
        signup,
        signin,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}