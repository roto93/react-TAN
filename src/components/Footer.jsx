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
                        <FooterButton title={'Home'} to={'/'}/>
                        <FooterButton title={'About'} to={'/about'}/>
                        <FooterButton title={'Links'} to={'/links'}/>
                        <FooterButton title={'Archive'} to={'/archive'}/>
                    </ul>
                    <p className="footer__author">Copyright © 1996-2021 NTNU ES Radio Group<br />
                        Maintained and designed by Tony Su & Josie Chen</p>
                </div>
            </div>
        </div>
    )
}

export default Footer

const FooterButton = ({title, to}) => {
    return (
        <li className="footer__item">
            <StyledLink to={to}>{title}</StyledLink>
        </li>
    )
}
