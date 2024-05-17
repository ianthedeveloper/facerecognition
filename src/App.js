import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
import Facerecognition from './components/Facerecognition/Facerecognition';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = 'Enter your PAT';
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
        imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log("Input:", event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    this.setState({imageUrl: this.state.input});

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => {
      response.json()
      console.log("Response", response);
    })
    .then(result => {
      console.log("Result", result); // Log the entire result object to see its structure
      if (result && result.outputs && result.outputs.length > 0) {
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
      } else {
          console.log('Invalid response structure'); // Handle invalid response
      }
    })
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













// CODE FROM BlueButterflies GitHub Acc




// import React, { Component } from 'react';
// import './App.css'
// import ParticlesBg from 'particles-bg';
// // import Particles from "react-particles";
// // import { loadFull } from "tsparticles";
// // import particlesOptions from "./particles.json";
// import Navigation from './components/Navigation/Navigation.js';
// // import Signin from './components/Signin/Signin';
// // import Register from './components/Register/Register';
// import Rank from './components/Rank/Rank';
// import Logo from './components/Logo/Logo';
// import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField.js';
// import Facerecognition from './components/Facerecognition/Facerecognition.js';

// const initialState = {
//     input: '',
//     imgUrl: ' ',
//     // box: {},
//     // route: 'signin',
//     // isSignedIn: false,
//     user: {
//         id: '',
//         name: '',
//         email: '',
//         entries: 0,
//         joined: ''
//     }
// }

// class App extends Component {

//     constructor() {
//         super();
//         this.state = initialState;
//     }

//     loadUser = (data) => {
//         this.setState({
//             user:{
//                 id: data.id,
//                 name: data.name,
//                 email: data.email,
//                 entries: data.entries,
//                 joined: data.joined
//             }
//         })
//     }
    
//     // calculateFaceLocation = (data) => {
//     //     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//     //     const image = document.getElementById('inputImage');
//     //     const width = Number(image.width)
//     //     const height = Number(image.height);

//     //     return {
//     //         leftCol: clarifaiFace.left_col * width,
//     //         topRow: clarifaiFace.top_row * height,
//     //         rightCol: width - (clarifaiFace.right_col * width),
//     //         bottomRow: height - (clarifaiFace.bottom_row * height)
//     //     }
//     // }

//     // displayFaceBox = (box) => {
//     //     this.setState({ box: box })
//     // }
    

//     onInputChange = (event) => {
//         this.setState({ input: event.target.value });
//     }

//     onButtonSubmit = () => {
//         this.setState({ imgUrl: this.state.input });

//         fetch("http://localhost:3000/imageUrl",{
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               input: this.state.input
//             })
//         })
//             .then(response => {
//               response.json()
//               console.log("Response:", response)
//             })
//             .then(response => {
//                 if (response) {
//                     fetch('http://localhost:3000/image', {
//                         method: 'put',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({
//                             id: this.state.user.id
//                         })
//                     })
//                         .then(response => response.json())
//                         .then(count => {
//                             this.setState(Object.assign(this.state.user, { entries: count }))
//                         })
//                 }
//                 // this.displayFaceBox(this.calculateFaceLocation(response))
//             })
//             .catch(error => console.log("Ooops! There was an error", error));
//     }

//     // onRouteChange = (route) =>{ 
//     //     if(route === 'signout'){
//     //         this.setState(initialState);
//     //     }else if(route === 'home'){
//     //         this.setState(
//     //             {
//     //                 isSignedIn: true    
//     //             }
//     //         )
//     //     }
//     //     this.setState({route: route});
//     // }

//     render() {
//       return (
//         <div className="App">
//           <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
//           <Navigation/>
//           <Logo/>
//           <Rank/>
//           <ImageProcessingField 
//             onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  
//           />
//           <Facerecognition imageUrl={this.state.imageUrl}  />
//         </div>
//       );
//     }
// }

// export default App;

