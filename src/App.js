import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageProcessingField/>
      </div>
    );
  }
}

export default App;
