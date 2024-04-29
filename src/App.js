import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
import Facerecognition from './components/Facerecognition/Facerecognition';


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonClick = (event) => {
    console.log("Click");
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageProcessingField 
          onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}  
        />
        <Facerecognition/>
      </div>
    );
  }
}

export default App;
