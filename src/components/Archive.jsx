import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { useHistory } from 'react-router-dom'
import Detail from './Detail'
import Issues from './Issues'

const Archive = () => {
    const { path, url } = useRouteMatch()
    const history = useHistory()

    const arr = ['2021', '2020', '2019', '2018', '2017', '2016']

    const Year = ({ year }) => {
        return (
            <div
                onClick={() => { history.push(`/archive/`) }}
                className="archive__year"
            >
                {year}
            </div>
        )
    }

    return (
        <Switch>
            <Route exact path={'/archive'}>
                <div className="archive">
                    <div className="container">
                        <div className="archive__content">
                            {arr.map(year => (
                                <Year key={year} year={year} />
                            ))}
                        </div>
                    </div>
                </div>
            </Route>
            {/* <Route path={`/home/:selectedYear/:categoryToShow`}> */}
            <Route path={`/archive/:selectedYear/:categoryToShow`}>
                <Issues />
            </Route>

            <Route path={`/archive/:id`}>
                <Detail />
            </Route>
        </Switch>
    )
}

export default Archive
