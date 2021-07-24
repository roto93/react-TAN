import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import News from './News'
import Cards from './Cards'

const Home = () => {
    const { path, url } = useRouteMatch()
    console.log(path)
    console.log(url)
    return (
        <Switch>
            <Route path={path}>
                <News />
                <Cards />
            </Route>
            <Route path={`${path}/:selectedYear/`}>
            </Route>
        </Switch>
    )
}

export default Home
