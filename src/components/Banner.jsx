import React, { useState } from 'react'
import * as SVG from '../images/SVG'

const Banner = () => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
    console.log('toggle menu')
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

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
              <li className="banner__topNav__item">Home</li>
              <li className="banner__topNav__item">About</li>
              <li className="banner__topNav__item">Link</li>
              <li className="banner__topNav__item">Archive</li>
            </ul>

            <li onClick={toggleMenu} className="banner__topNav__menu">
              <SVG.SvgMenu />
            </li>
          </ul>

          {/* nav */}
          <ul className="banner__nav">
            <li className="banner__nav__item"></li>
          </ul>

          {/* TAN 標題 */}
          <div className="banner__title">
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
