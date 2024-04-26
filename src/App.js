import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Logo/>
        <Rank/>
      </div>
    );
  }
}

export default App;
