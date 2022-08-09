import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import * as SVG from '../images/SVG'

const Banner = ({ innerRef }) => {
  const path = useLocation().pathname
  const history = useHistory()

  const getNavClass = (pathName) => {
    let shouldActive = path.split('/')[1] === pathName

    return `banner__nav__item ${shouldActive ? 'active' : ''}`
  }

  const navigateTo = (destination) => {
    if (path === destination) return
    history.push(destination)
  }

  return (
    <div ref={innerRef} className={'banner'}>
      <div className="container">
        <div className="banner__content">


          {/* TAN 標題 */}
          <div className="banner__title">

            {/* nav */}
            <ul className="banner__nav">

              <li onClick={() => { navigateTo('/home') }} className={getNavClass('home')}>
                Home
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li onClick={() => { navigateTo('/about') }} className={getNavClass('about')}>
                About
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li className="banner__nav__logo"><SVG.SvgObservatory /></li>
              <li onClick={() => { navigateTo('/links') }} className={getNavClass('links')}>
                Links
                <div className="banner__star"><SVG.Star /></div>
              </li>

              <li onClick={() => { navigateTo('/archive') }} className={getNavClass('archive')}>
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
