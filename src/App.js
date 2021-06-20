import './css/reset.css'
import './css/App.css';
import React from 'react'
import Banner from './components/Banner';
import LatestNews from './components/LatestNews'
import Cards from './components/Cards'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {


  return (
    <Router>
      <div className="App">
        <Banner />
        <article>
          <Switch>
            <Route exact path="/">
              <LatestNews />
              <Cards />
            </Route>
            <Route>
              {/* <About /> */}
            </Route>
            <Route>
              {/* <Links /> */}
            </Route>
            <Route>
              {/* <Archive /> */}
            </Route>
          </Switch>
        </article>
      </div >
    </Router>
  );
}

export default App;
