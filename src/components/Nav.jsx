import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useScroll from '../hooks/useScroll'
import useWindowSize from '../hooks/useWindowSize'
import * as SVG from '../images/SVG'
import useScrollbarSize from 'react-scrollbar-size';


const Nav = ({ isBannerIntersecting }) => {
    const tabHighlightRef = useRef(null)
    const navRef = useRef(null)
    const { width: winX, height: winY } = useWindowSize()
    const { pathname } = useLocation()
    const history = useHistory()
    const [isScrollDown, setIsScrollDown] = useScroll()
    const { width: scrollBarwidth } = useScrollbarSize();

    useEffect(() => {
        if (winX < 600) {
            if (isScrollDown) {
                navRef.current.style.transform = `translateY(-48px)`
            } else {
                navRef.current.style.transform = `translateY(0px)`
            }
            return
        }
        navRef.current.style.transform = isBannerIntersecting ? `translateY(-100%)` : `translateY(0%)`

    }, [winX, isScrollDown, isBannerIntersecting])

    const onNavItemClick = (path) => {
        history.push(`/${path}`)
        window.scrollTo(0, winY - 100)
        navRef.current.style.transform = `translateY(0px)`
        setTimeout(() => {
            navRef.current.style.transform = `translateY(0px)`
            setIsScrollDown(false)
        }, 10);
    }

    useEffect(() => {
        const moveTabHighlight = () => {

            const mainPath = pathname.split('/')[1]
            const getIndex = () => {
                if (mainPath === 'home') return 0
                if (mainPath === 'about') return 1
                if (mainPath === 'links') return 2
                if (mainPath === 'archive') return 3
                return 0
            }
            let highlightX
            if (winX < 600) {
                const step = 68 + (((winX - scrollBarwidth) < 1200 ? winX - scrollBarwidth : 1200) * 0.8 - 68 * 4) / 3
                highlightX = step * getIndex()
            } else {
                const step = 15 + 84
                highlightX = step * getIndex()
            }
            tabHighlightRef.current.style.transform = `translate(${highlightX}px)`
        }

        if (tabHighlightRef.current) moveTabHighlight()
        return () => {
            if (tabHighlightRef.current) moveTabHighlight()
        }

    }, [winX, pathname])

    const toggleTab = (tabName) => pathname.split('/')[1] === tabName ? 'active' : ''

    return (
        <nav ref={navRef} className="nav">
            <div className="container">
                <div className="nav__content">
                    <div className="nav__header">
                        <div className="nav__logo"><SVG.SvgObservatory /></div>
                        <h2 className="nav__title">
                            T<small>aiwan</small> A<small>stronomy</small> N<small>etwork</small>
                        </h2>
                    </div>
                    <ul className="nav__list">
                        <li onClick={() => { onNavItemClick('home') }} className={`nav__item ${toggleTab('home')}`}>Home
                            <div className="nav__star"><SVG.Star /></div></li>
                        <li onClick={() => { onNavItemClick('about') }} className={`nav__item ${toggleTab('about')}`}>About
                            <div className="nav__star"><SVG.Star /></div></li>
                        <li onClick={() => { onNavItemClick('links') }} className={`nav__item ${toggleTab('links')}`}>Links
                            <div className="nav__star"><SVG.Star /></div></li>
                        <li onClick={() => { onNavItemClick('archive') }} className={`nav__item ${toggleTab('archive')}`}>Archive
                            <div className="nav__star"><SVG.Star /></div></li>
                        <li ref={tabHighlightRef} className="nav__highlight"></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
