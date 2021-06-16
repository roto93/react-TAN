import './reset.css'
import './App.css';
import React from 'react'
import * as SC from './components/StyledComponents'
import * as SVG from './images/SVG'
import BG from './images/BG.png'

function App() {
  return (
    <div className="App">
      <img src={BG} alt=" " className="BG" />
      <SC.ForeGround>
        <header>
          <div className="main-view">

            <nav>
              <SC.TO>Home</SC.TO>
              <SC.TO>About</SC.TO>
              <div className="observatory">
                <SVG.SvgObservatory />
              </div>
              <SC.TO>Links</SC.TO>
              <SC.TO>Archive</SC.TO>
            </nav>
            <SC.TitleBox>
              <SC.TitleRowDiv>
                <h2>T</h2>
                <p>aiwan</p>
              </SC.TitleRowDiv>
              <SC.TitleRowDiv>
                <h2>A</h2>
                <p>stronomy</p>
              </SC.TitleRowDiv>
              <SC.TitleRowDiv>
                <h2>N</h2>
                <p>etwork</p>
              </SC.TitleRowDiv>
            </SC.TitleBox>
            <div className="arrow">
              <SVG.SvgArrow />
            </div>

          </div>
        </header>

        <div className="latest">
          <p>Latest Issues</p>
          <div className="line"></div>
          <ul>
            <li><a href="#">TAN (Issue Apr 19 - 25, 2021)</a></li>
            <li><a href="#">ASIAA Colloquium/Seminar /Lunchtalk (Apr 26) (Apr 28)</a></li>
            <li><a href="#">[EAVN2021B] Call for Proposals - East Asian VLBI Network (EAVN) 2021B</a></li>
            <li><a href="#">[KVN2021B] Call for Proposals - Korean VLBI Network (KVN) 2021B</a></li>
            <li><a href="#">NCTS Theoretical and Computational Astrophysics Summer Student Program</a></li>
          </ul>
        </div>

      </SC.ForeGround>
    </div>
  );
}

export default App;
