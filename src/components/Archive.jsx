import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { useHistory } from 'react-router-dom'
import Detail from './Detail'
import Issues from './Issues'
import Update from './Update'
import { useAuth } from '../hooks/AuthContext'
import PrivateRoute from './PrivateRoute'

const Archive = () => {
    const { path, url } = useRouteMatch()
    const history = useHistory()
    const { currentUser } = useAuth()
    const Year = ({ year }) => {

        return (
            <div
                onClick={() => { history.push(`/archive/list/${year}/All`) }}
                className="archive__year"
            >
                {year}
            </div>
        )
    }

    return (
        <Switch>
            <Route exact path={`${path}`}>
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
            <Route path={`${path}/list/:selectedYear/:categoryToShow`}>
                <Issues />
            </Route>

            <Route path={`${path}/id/:id`}>
                <Detail />
            </Route>

            <PrivateRoute path={`${path}/update/:id`} isAuth={currentUser}>
                <Update />
            </PrivateRoute>
        </Switch>
    )
}

export default Archive

const arr = [
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009'
]