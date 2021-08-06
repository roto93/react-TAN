import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth } from '../firebase'


const AuthContext = createContext()

// useContext 取值
export const useAuth = () => useContext(AuthContext)



// Provider 給值
export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({})

    const signup = (email, passward) => {
        return auth.signUpWithEmailAndPassword(email, passward)
    }

    const signin = (email, passward) => {
        return auth.signInWithEmailAndPassword(email, passward)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        signin
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}