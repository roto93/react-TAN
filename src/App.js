import './css/reset.css'
import './css/App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Banner from './components/Banner'
import Home from './components/Home'
import Footer from './components/Footer'
import Letter from './components/Letter'

function App() {

  return (
    <Router>
      <div className="App">
        <Banner />
        <main className="main">
          <Switch>
            <Route exact path={"/"}>
              <Home />
              {/* <Switch>
                <News />
                <Cards />
              </Switch> */}
            </Route>

            <Route path={"/about"}>
              <Letter />
            </Route>
            <Route path={"/links"}>

            </Route>
            <Route path={"/archive"}>

            </Route>
          </Switch>
          <Footer />
        </main>
      </div >
    </Router>
  );
}

export default App;
