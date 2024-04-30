import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
import Facerecognition from './components/Facerecognition/Facerecognition';


const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '70d2b99eec204856bc2886b35b22b05d';
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
        input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    console.log("Click");

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
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
    .catch(error => console.log('error', error));
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg className="particlesBg" num={331} type="cobweb" bg={true} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageProcessingField 
          onInputChange={this.onInputChange} onButtonClick={this.onButtonSubmit}  
        />
        <Facerecognition/>
      </div>
    );
  }
}

export default App;
