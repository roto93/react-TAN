import React from 'react'
import { StyledLink } from './Styled'
import * as SVG from '../images/SVG'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__titleBox">
                        <div className="footer__logo"><SVG.SvgObservatory /></div>
                        <h2 className="footer__title">Taiwan Astronomy Network</h2>
                    </div>
                    <ul className="footer__list">
                        <li className="footer__item">
                            <StyledLink to={'/'}>Home</StyledLink>
                        </li>
                        <li className="footer__item">
                            <StyledLink to={'/about'}>About</StyledLink>
                        </li>
                        <li className="footer__item">
                            <StyledLink to={'/links'}>Links</StyledLink>
                        </li>
                        <li className="footer__item">
                            <StyledLink to={'/archive'}>Archive</StyledLink>
                        </li>
                    </ul>
                    <p className="footer__author">Copyright © 1996-2021 NTNU ES Radio Group<br />
                        Maintained and designed by Tony Su & Josie Chen</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
