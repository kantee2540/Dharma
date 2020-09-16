import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Menu from './Component/Menu'
import Footer from './Component/Footer'

import Home from './Home/Home'
import Schedule from './Schedule/Schedule'
import Sound from './Sound/Sound'
import Video from './Video/Video'
import About from './About/About'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Menu/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/schedule">
          <Schedule/>
        </Route>
        <Route path="/sound">
          <Sound/>
        </Route>
        <Route path="/video">
          <Video/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
      </Switch>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
