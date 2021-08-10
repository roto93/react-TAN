import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, isAuth, path }) => {
    return (
        <Route path={path}>
            {isAuth ? children : <Redirect to={'/home'} />}
        </Route>
    )
}

export default PrivateRoute
