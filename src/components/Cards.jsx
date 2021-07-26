import React, { useEffect, useRef } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import VanillaTilt from 'vanilla-tilt'
import { useRouteMatch, useHistory } from 'react-router-dom'

// reverse:           false,  // reverse the tilt direction
// max:               35,     // max tilt rotation (degrees)
// perspective:       1000,   // Transform perspective, the lower the more extreme the tilt gets.
// scale:             1,      // 2 = 200%, 1.5 = 150%, etc..
// speed:             300,    // Speed of the enter/exit transition
// transition:        true,   // Set a transition on enter/exit.
// axis:              null,   // What axis should be disabled. Can be X or Y.
// reset:             true,   // If the tilt effect has to be reset on exit.
// easing:            "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
// glare:             false,   // if it should have a "glare" effect
// "max-glare":       1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
// "glare-prerender": false   // false = VanillaTilt creates the glare elements for you, otherwise
// you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself


const navigateTo = (history, destination) => {
    history.push(destination)
}

const CardLink = ({ year, category }) => {
    const { url } = useRouteMatch()
    const history = useHistory()
    return (
        <li
            onClick={() => { navigateTo(history, `${url}/${year}/${category}`) }}
            className="cards__card__item">
            {category}
        </li>
    )
}


const Cards = () => {
    const { width: winX } = useWindowSize()
    const isMobile = winX < 600
    const { url } = useRouteMatch()
    const history = useHistory()
    const options = {
        perspective: 3000,
        scale: isMobile ? 1 : 1.02,
        max: isMobile ? 0 : 5
    }

    const Card = ({ year }) => {
        const cardRef = useRef(null)
        useEffect(() => {
            VanillaTilt.init(cardRef.current, options)
        }, [])
        return (
            <div className={`cards__card ${isMobile ? '' : 'hide'}`} ref={cardRef} >
                <h2 onClick={() => { navigateTo(history, `${url}/${year}/All`) }} className="cards__h2">
                    {year}
                </h2>
                <ul className="cards__card__list">
                    <CardLink year={year} category={"Announcement"} />
                    <CardLink year={year} category={"Conferences"} />
                    <CardLink year={year} category={"Seminar"} />
                    <CardLink year={year} category={"Opportunities"} />
                    <CardLink year={year} category={"Observations"} />
                    <CardLink year={year} category={"Miscellaneous"} />
                </ul>
            </div>
        )
    }

    return (
        <div className="cards">
            <div className="container">
                <div className="cards__content">
                    {cardsArr.map((year) => <Card key={year} year={year} />)}
                </div>
            </div>
        </div>
    )
}

export default Cards

const cardsArr = [
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
]