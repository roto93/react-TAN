import React, { useState } from 'react'
import '../css/Banner.css'
import * as SVG from '../images/SVG'

export default function Banner() {
    const [showNav, setShowNav] = useState(false);

    return (
        <div className="banner">
            <header>
                <div className="observatory">
                    <SVG.SvgObservatory />
                </div>
                <div className="burger"
                    onClick={() => { setShowNav(!showNav) }}>
                    <SVG.SvgMenu />
                </div>
            </header>
            <div className={showNav ? "menu active" : "menu"}>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Links</li>
                    <li>Archive</li>
                </ul>
            </div>
            <div className="title-box">
                <ul className="nav">
                    <li>Home</li>
                    <li>About</li>
                    <div className="observatory">
                        <SVG.SvgObservatory />
                    </div>
                    <li>Links</li>
                    <li>Archive</li>
                </ul>
                <div className="txt">

                    <div>
                        <h1>T</h1><h2>aiwan</h2>
                    </div>
                    <div>
                        <h1>A</h1><h2>stronomy</h2>
                    </div>
                    <div>
                        <h1>N</h1><h2>etwork</h2>
                    </div>
                </div>
                <div className="arrow">
                    <SVG.SvgArrow />
                </div>
            </div>
            <div className="gradient"></div>
        </div>
    )
}
