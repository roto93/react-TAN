import './css/reset.css'
import './css/App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Banner from './components/Banner'
import News from './components/News.jsx'
import Cards from './components/Cards'
import Footer from './components/Footer'

function App() {


  return (
    <Router>
      <div className="App">
        <Banner />
        <main className="main">
          <Switch>
            <Route exact path={"/"}>
              <News />
              <Cards />
              <Footer />
            </Route>
            <Route path={"/about"}></Route>
            <Route path={"/links"}></Route>
            <Route path={"/archive"}></Route>
          </Switch>
        </main>
      </div >
    </Router>
  );
}

export default App;
