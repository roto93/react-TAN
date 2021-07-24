import React from 'react'
import { StyledLink } from './Styled'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__content">
                    <h2 className="footer__title">Taiwan Astronomy Network</h2>
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
                    <p className="footer__author">This webpage is designed & maintained by<br />Guan-Ting Su</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
