import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
import Facerecognition from './components/Facerecognition/Facerecognition';
import { jsx } from 'react/jsx-runtime';


const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '70d2b99eec204856bc2886b35b22b05d';
  // const PAT = '86a7c1fb3a564cef9792728daeaae130';
  const USER_ID = 'ianthedeveloper';
  const APP_ID = 'my-first-application';
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
  });

  const requestOptions = {
  method: 'POST',
  headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

    return requestOptions;

}

class App extends Component {
  constructor(){
    super();
    this.state = {
        input: '',
        imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {
    console.log("Click");
    this.setState({imageUrl: this.state.input})

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => {
      response.json()
      console.log(response);
    })
    .then(result => {
        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                
            });
        });
    })
    .catch(error => console.log('Ooops! There was an error', error));
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageProcessingField 
          onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  
        />
        <Facerecognition imageUrl={this.state.imageUrl}  />
      </div>
    );
  }
}

export default App;
