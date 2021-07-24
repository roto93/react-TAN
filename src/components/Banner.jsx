import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { StyledLink } from './Styled';
import * as SVG from '../images/SVG'

const Banner = () => {
  const path = useLocation().pathname
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
    console.log('toggle menu')
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const getNavClass = (pathName) => `banner__nav__item ${path === pathName ? 'active' : ''}`




  return (
    <div className={'banner'}>
      <div className="container">
        <div className="banner__content">

          {/* topNav */}
          <ul onMouseLeave={closeMenu} className="banner__topNav">
            <li className="banner__topNav__logo">
              <SVG.SvgObservatory />
            </li>

            <ul className={`banner__topNav__list ${showMenu && 'active'}`}>
              <li className={`banner__topNav__item`}><StyledLink to={"/"}>Home</StyledLink></li>
              <li className={`banner__topNav__item`}><StyledLink to={"/about"}>About</StyledLink></li>
              <li className={`banner__topNav__item`}><StyledLink to={"/links"}>Links</StyledLink></li>
              <li className={`banner__topNav__item`}><StyledLink to={"/archive"}>Archive</StyledLink></li>

            </ul>

            <li onClick={toggleMenu} className="banner__topNav__menu">
              <SVG.SvgMenu />
            </li>
          </ul>


          {/* TAN 標題 */}
          <div className="banner__title">

            {/* nav */}
            <ul className="banner__nav">

              <li className={getNavClass('/')}>
                <StyledLink to={"/"}>Home</StyledLink>
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li className={getNavClass('/about')}>
                <StyledLink to={"/about"}>About</StyledLink>
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li className="banner__nav__logo"><SVG.SvgObservatory /></li>
              <li className={getNavClass('/links')}>
                <StyledLink to={"/links"}>Links</StyledLink>
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li className={getNavClass('/archive')}>
                <StyledLink to={"/archive"}>Archive</StyledLink>
                <div className="banner__star"><SVG.Star /></div>
              </li>

            </ul>

            <h1 className="banner__title__h1">Taiwan</h1>
            <h1 className="banner__title__h1 astronomy">Astronomy</h1>
            <h1 className="banner__title__h1">Network</h1>
            <div className="banner__arrow"><SVG.SvgArrow /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
