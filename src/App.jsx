import './css/reset.css'
import './css/App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Banner from './components/Banner'
import News from './components/News';
import Cards from './components/Cards';
import Footer from './components/Footer'
import Letter from './components/Letter'
import Links from './components/Links';
import Archive from './components/Archive';
import Login from './components/Login';
import Nav from './components/Nav';
import { ScrollToTopOnMount } from './components/ScrollToTopOnMount';
import { AuthProvider } from './hooks/AuthContext';
import useObserver from './hooks/useObserver';
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  const [ref, isIntersecting] = useObserver({ threshold: 0.45 })

  return (
    <AuthProvider>
      <Router >
        <ScrollToTopOnMount />
        <div className="App">
          <Banner innerRef={ref} />
          <main className="main">
            <Switch >
              <Route exact path={'/'}>
                <Redirect from={'/'} to={'/home'} />
              </Route>

              <Route path={"/home"}>
                <News />
                <Cards />
              </Route>

              <Route path={"/about"}>
                <Letter />
              </Route>

              <Route path={"/links"}>
                <Links />
              </Route>

              <Route path={"/archive"}>
                <Archive />
              </Route>

              <Route path={'/login'}>
                <Login />
              </Route>

            </Switch>
            <Footer />
            <Nav isBannerIntersecting={isIntersecting} />

          </main>
        </div >
      </Router>
    </AuthProvider>
  );
}

export default App;
