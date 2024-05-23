import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
import Facerecognition from './components/Facerecognition/Facerecognition';

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '70d2b99eec204856bc2886b35b22b05d';
  const USER_ID = 'ianthedeveloper';
  const APP_ID = 'my-first-application';
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
        imageUrl: '',
        box: {},
        route: '',
    }
  }
  
  calculateFaceLocation = (result) => {
    const faceData = result.outputs[0].data.regions[0].region_info.bounding_box;
    const imageInput = document.getElementById("imageInput");
    const width = Number(imageInput.width);
    const height = Number(imageInput.height);

    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)
    }
  }

  displayFaceLocation = (box) => {
    console.log("Box:", box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    // console.log("Input:", event.target.value);
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () => {
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    this.setState({imageUrl: this.state.input});

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => this.displayFaceLocation(this.calculateFaceLocation(result)))
    .catch(error => console.log('Ooops! There was an error', error));
  }

  onRouteChange = (route) => {
    console.log(route);
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
        { this.state.route === 'signin' ?
          <Signin/> : 
          <div>
            <Navigation/>
            <Logo/>
            <Rank/>
            <ImageProcessingField 
              onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  
            />
            <Facerecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        }
      </div>
    );
  }
}

export default App;













//MY PLAYGROUND

// import React, { useState } from 'react';
// import './App.css';
// import ParticlesBg from 'particles-bg';
// import Navigation from './components/Navigation/Navigation';
// import Logo from './components/Logo/Logo';
// import Rank from './components/Rank/Rank';
// import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
// import Facerecognition from './components/Facerecognition/Facerecognition';

// const returnClarifaiRequestOptions = (imageUrl) => {
//   // Your PAT (Personal Access Token) can be found in the Account's Security section
//   const PAT = '70d2b99eec204856bc2886b35b22b05d';
//   const USER_ID = 'ianthedeveloper';
//   const APP_ID = 'my-first-application';
//   const IMAGE_URL = imageUrl;
  
//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                     // "base64": IMAGE_BYTES_STRING
//                 }
//             }
//         }
//     ]
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };

//   return requestOptions;
// }

// const App = () => {
//   const [input, setInput] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [box, setBox] = useState({});

//   const calculateFaceLocation = (result) => {
//     const faceData = result.outputs[0].data.regions[0].region_info.bounding_box;
//     const width = 500;
//     const height = 500; 

//     return {
//       leftCol: faceData.left_col * width,
//       topRow: faceData.top_row * height,
//       rightCol: width - (faceData.right_col * width),
//       bottomRow: height - (faceData.bottom_row * height)
//     }
//   }

//   const displayFaceLocation = (box) => {
//     console.log("Box:", box)
//     setBox(box);
//   }

//   const onInputChange = (event) => {
//     setInput(event.target.value);
//   }

//   const onButtonSubmit = () => {
//     const MODEL_ID = 'face-detection';
//     const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
//     setImageUrl(input);

//     fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnClarifaiRequestOptions(input))
//     .then(response => response.json())
//     .then(result => displayFaceLocation(calculateFaceLocation(result)))
//     .catch(error => console.log('Ooops! There was an error', error));
//   }

//   return (
//     <div className="App">
//       <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
//       <Navigation/>
//       <Logo/>
//       <Rank/>
//       <ImageProcessingField 
//         onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}  
//       />
//       <Facerecognition box={box} imageUrl={imageUrl} />
//     </div>
//   );
// }

// export default App;
