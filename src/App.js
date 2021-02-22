import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './Component/Menu'
import Footer from './Component/Footer'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

import Home from './Home/Home'
import Schedule from './Schedule/Schedule'
import Sound from './Sound/Sound'
import Video from './Video/Video'
import About from './About/About'

export default class App extends React.Component {

  componentDidMount(){
    dayjs.extend(buddhistEra);
    dayjs.locale('th');
  }

  render(){
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
}