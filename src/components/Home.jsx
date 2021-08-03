import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import News from './News'
import Cards from './Cards'
import Issues from './Issues'

const Home = () => {
    const { path, url } = useRouteMatch()
    console.log(path)
    console.log(url)
    return (
        <Switch>
            <Route exact path={'/home'}>
                <News />
                <Cards />
            </Route>
            {/* <Route path={`/archive/:selectedYear/:categoryToShow`}>
                <Issues />
            </Route> */}
        </Switch>
    )
}

export default Home
