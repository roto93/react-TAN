import './reset.css'
import './App.css';
import React from 'react'
import * as SC from './components/StyledComponents'
import * as SVG from './images/SVG'
import BG from './images/BG.png'

function App() {
  return (
    <div className="App">
      <div className="banner">
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
          <header>
            <div className="txt">
              <span>
                <h1>T</h1><h2>aiwan</h2>
              </span>
              <span>
                <h1>A</h1><h2>stronomy</h2>
              </span>
              <span>
                <h1>N</h1><h2>etwork</h2>
              </span>
            </div>
          </header>
          <div className="arrow">
            <SVG.SvgArrow />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
