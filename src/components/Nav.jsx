import React, { useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router'
import useWindowSize from '../hooks/useWindowSize'
import * as SVG from '../images/SVG'

const Nav = () => {
    const tabHighlightRef = useRef(null)
    const { width: winX, height } = useWindowSize()
    const history = useHistory()
    const { pathname } = useLocation()
    const onNavItemClick = (path) => {
        history.push(`/${path}`)

        // const winX = window.innerWidth

    }


    const toggleTab = (tabName) => pathname.split('/')[1] === tabName ? 'active' : ''
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__content">
                    <div className="nav__header">
                        <div className="nav__logo"><SVG.SvgObservatory /></div>
                        <h2 className="nav__title">
                            T<small>aiwan</small> <small>stronomy</small> N<small>etwork</small>
                        </h2>
                    </div>
                    <ul className="nav__list">
                        <li onClick={() => { onNavItemClick('home') }} className={`nav__item ${toggleTab('home')}`} >Home</li>
                        <li onClick={() => { onNavItemClick('about') }} className={`nav__item ${toggleTab('about')}`}>About</li>
                        <li onClick={() => { onNavItemClick('links') }} className={`nav__item ${toggleTab('links')}`}>Links</li>
                        <li onClick={() => { onNavItemClick('archive') }} className={`nav__item ${toggleTab('archive')}`}>Archive</li>
                        <li ref={tabHighlightRef} className="nav__highlight"></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
