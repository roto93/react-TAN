import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import * as SVG from '../images/SVG'

const Banner = () => {
  const path = useLocation().pathname
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const getNavClass = (pathName) => {
    let shouldActive
    if (pathName === '/home') shouldActive = path.substr(0, 5) === pathName
    else shouldActive = path === pathName
    return `banner__nav__item ${shouldActive ? 'active' : ''}`
  }

  const navigateTo = (destination) => {
    if (path === destination) return
    history.push(destination)
    closeMenu()
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
            <h1 className="banner__topNav__title" >{path.split('/')[1]}</h1>
            <li onClick={toggleMenu} className="banner__topNav__menu">
              <SVG.SvgMenu />
            </li>

            <ul className={`banner__topNav__list ${showMenu && 'active'}`}>
              <li onClick={() => { navigateTo('/home') }} className={`banner__topNav__item`}>Home</li>
              <li onClick={() => { navigateTo('/about') }} className={`banner__topNav__item`}>About</li>
              <li onClick={() => { navigateTo('/links') }} className={`banner__topNav__item`}>Links</li>
              <li onClick={() => { navigateTo('/archive') }} className={`banner__topNav__item`}>Archive</li>
            </ul>

          </ul>


          {/* TAN 標題 */}
          <div className="banner__title">

            {/* nav */}
            <ul className="banner__nav">

              <li onClick={() => { navigateTo('/home') }} className={getNavClass('/home')}>
                Home
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li onClick={() => { navigateTo('/about') }} className={getNavClass('/about')}>
                About
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li className="banner__nav__logo"><SVG.SvgObservatory /></li>
              <li onClick={() => { navigateTo('/links') }} className={getNavClass('/links')}>
                Links
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li onClick={() => { navigateTo('/archive') }} className={getNavClass('/archive')}>
                Archive
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
