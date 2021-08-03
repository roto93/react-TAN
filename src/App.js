import './css/reset.css'
import './css/App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import Banner from './components/Banner'
import Home from './components/Home'
import Footer from './components/Footer'
import Letter from './components/Letter'
import Upload from './components/Upload';
import Archive from './components/Archive';
import { useEffect } from "react";
import useWindowSize from './hooks/useWindowSize';


function App() {

  return (
    <Router >
      <div className="App">
        <Banner />
        <main className="main">
          <Switch >
            <Route exact path={'/'}>
              <Redirect from={'/'} to={'/home'} />
            </Route>

            <Route path={"/home"}>
              <Home />
            </Route>

            <Route path={"/about"}>
              <Letter />
            </Route>

            <Route path={"/links"}>
              <Upload />
            </Route>

            <Route path={"/archive"}>
              <Archive />
            </Route>

          </Switch>
          <Footer />
        </main>
      </div >
    </Router>
  );
}

export default App;
