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
import CookieConsent from './Component/CookieConsent';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cookieAccepted: localStorage.getItem('cookie-accept') === 'true' ? true: false
    }
    this.onAcceptCookie.bind(this)
  }
  

  componentDidMount(){
    dayjs.extend(buddhistEra);
    dayjs.locale('th');
  }

  onAcceptCookie = () => {
    localStorage.setItem('cookie-accept', 'true')
    this.setState({ cookieAccepted: true })
  }

  render(){
    return (
      <div>
        <BrowserRouter>
        <div className="App">
          <UserStack/>
        </div>
        </BrowserRouter>
        <CookieConsent
        isAccepted={this.state.cookieAccepted}
        onAccept={this.onAcceptCookie}
        />
      </div>
    );
  }
}

function UserStack(){
  return(
    <>
    <BrowserRouter basename="/">
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
    </BrowserRouter>
    </>
  )
}