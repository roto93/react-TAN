import './reset.css'
import './App.css';
import React, { useState } from 'react'
import * as SVG from './images/SVG'
import Banner from './components/Banner';
import LatestNews from './components/LatestNews'
import Cards from './components/Cards'

function App() {
  const [showNav, setShowNav] = useState(false);


  return (
    <div className="App">
      <Banner />
      {/* <div className="gradient">
        <SVG.SvgGradientBox />
      </div> */}
      <article>
        <LatestNews />
        <Cards />
      </article>

    </div >
  );
}

export default App;
