import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, isAuth }) => {
    return (
        <Route>
            {isAuth ? children : <Redirect to={'/home'} />}
        </Route>
    )
}

export default PrivateRoute
