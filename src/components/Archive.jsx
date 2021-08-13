import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { useHistory } from 'react-router-dom'
import Detail from './Detail'
import Issues from './Issues'
import Update from './Update'
import { useAuth } from '../hooks/AuthContext'
import PrivateRoute from './PrivateRoute'
import file from '../images/file.png'
import * as SVG from '../images/SVG'


const Archive = () => {
    const [yearArray, setYearArray] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [shouldReverseYears, setShouldReverseYears] = useState(false);
    const { path, url } = useRouteMatch()
    const history = useHistory()
    const { currentUser } = useAuth()
    const Year = ({ year }) => {

        return (
            <div
                onClick={() => { history.push(`/archive/list/${year}/All`) }}
                className="archive__file"
            >
                <img src={file} className="archive__fileImg" />
                <h2 className="archive__year">{year}</h2>
            </div>
        )
    }


    const reverseYears = () => {
        setShouldReverseYears(!shouldReverseYears)
        console.log('reverse')
        console.log(shouldReverseYears)
    }


    const ARROW_STYLE = {
        transform: `scaleY( ${shouldReverseYears ? -1 : 1}) `
    }

    const onSearchYear = (inputYear) => {
        let newArr = [...arr]

        newArr = shouldReverseYears ? newArr.sort(() => -1) : newArr

        if (searchText === '') return newArr
        const digit = inputYear.length
        const result = newArr.filter(item => {
            return item.slice(0, digit) === inputYear
        })

        return result
    }

    const onInputChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
    }


    useEffect(() => {

        let newArray = onSearchYear(searchText)
        setYearArray([...newArray])
    }, [searchText, shouldReverseYears])

    useEffect(() => {
        setYearArray(arr)
    }, [])

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <div className="archive">
                    <div className="container">
                        <div className="archive__content">
                            <div className="archive__header">
                                <div className="archive__search_logo"><SVG.Search /></div>
                                <input
                                    type="text"
                                    className="archive__search"
                                    placeholder="Search year..."
                                    value={searchText}
                                    onChange={onInputChange}
                                />
                                <div className="archive__sort"
                                    onClick={reverseYears}
                                >
                                    <div className="archive__sort__logo"><SVG.Sort /></div>
                                    <div className="archive__sort__text">Years</div>
                                    <div className="archive__sort__arrowLogo" style={ARROW_STYLE}><SVG.ArrowDown /></div>
                                </div>
                            </div>
                            <div className="archive__fileBox">
                                {yearArray.map(year => (
                                    <Year key={year} year={year} />
                                ))}
                            </div>
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
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
    '1996',
]