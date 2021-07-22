import './css/reset.css'
import './css/App.css';
import React from 'react'
import Banner from './components/Banner'
import News from './components/News.jsx'

function App() {


  return (
    <div className="App">
      <Banner />
      <main className="main">
        <News />
        {/* <Cards/> */}
      </main>
    </div >
  );
}

export default App;
