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













// CODE FROM Discord

// import React, { useState } from 'react';
// import './App.css';
// import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarifai';
// import Navigation from './components/Navigation/Navigation';
// import Logo from './components/Logo/Logo';
// import Rank from './components/Rank/Rank';
// import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
// import Facerecognition from './components/Facerecognition/Facerecognition';



// const app = new Clarifai.App({
//   apiKey: 'b99b35c39d5a491d956f588c06afd1a0'
// });
  
  
// const returnClarifaiRequestOptions = (imageUrl) => {
  
//   const PAT = '70d2b99eec204856bc2886b35b22b05d'; 
//   const USER_ID = 'ianthedeveloper';       
//   const APP_ID = 'my-first-application';
//   const IMAGE_URL = imageUrl;
  
//   const raw = JSON.stringify({
//       "user_app_id": {
//           "user_id": USER_ID,
//           "app_id": APP_ID
//       },
//       "inputs": [
//           {
//               "data": {
//                   "image": {
//                       "url": IMAGE_URL
//                   }
//               }
//           }
//       ]
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key' + PAT
//     },
//     body: raw
//   };
    
//   return requestOptions;

// }
  
// function App () {
//   const MODEL_ID = 'face-detection';   
//   const [input, setInput] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
  
//   const onInputChange = (event) => {
//     console.log(event.target.value);
//     setInput(input : event.target.value);
//   }
//   const onButtonSubmit = () => {
//     setImageUrl(input);
//     app.models.predict('face-detection',input)
//     fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", 
//     returnClarifaiRequestOptions(input))
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .then(
//       function(response){
//         console.log(response);
//       },
//       function(err){
      
//       }
//     );
//   }
//   render() {
//     return (
//       <div className="App">
//         <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
//         <Navigation/>
//         <Logo/>
//         <Rank/>
//         <ImageProcessingField 
//           onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}  
//         />
//         <Facerecognition imageUrl={imageUrl}  />
//       </div>
//     );
//   }
// }

// export default App;











// CORRECTED DISCORD CODE BY ChatGPT

// import React, { useState } from 'react';
// import './App.css';
// import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarifai';
// import Navigation from './components/Navigation/Navigation';
// import Logo from './components/Logo/Logo';
// import Rank from './components/Rank/Rank';
// import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
// import Facerecognition from './components/Facerecognition/Facerecognition';

// const app = new Clarifai.App({
//   apiKey: 'b99b35c39d5a491d956f588c06afd1a0'
// });

// const returnClarifaiRequestOptions = (imageUrl) => {
//   const PAT = '70d2b99eec204856bc2886b35b22b05d';
//   const USER_ID = 'ianthedeveloper';
//   const APP_ID = 'my-first-application';
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     "user_app_id": {
//       "user_id": USER_ID,
//       "app_id": APP_ID
//     },
//     "inputs": [
//       {
//         "data": {
//           "image": {
//             "url": IMAGE_URL
//           }
//         }
//       }
//     ]
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Authorization': 'Key ' + PAT // Added space after 'Key'
//     },
//     body: raw
//   };

//   return requestOptions;
// }

// function App() {
//   const MODEL_ID = 'face-detection';
//   const [input, setInput] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const onInputChange = (event) => {
//     console.log(event.target.value);
//     setInput(event.target.value); // Removed wrapping input with curly braces
//   }

//   const onButtonSubmit = () => {
//     setImageUrl(input);
//     app.models.predict('face-detection', input)
//       .then(response => {
//         console.log(response);
//         return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(input))
//       })
//       .then(response => response.json())
//       .then(result => console.log(result))
//       .catch(err => console.log(err));
//   }

//   return (
//     <div className="App">
//       <ParticlesBg className="particlesBg" num={331} type="fountain" bg={true} />
//       <Navigation />
//       <Logo />
//       <Rank />
//       <ImageProcessingField
//         onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}
//       />
//       <Facerecognition imageUrl={imageUrl} />
//     </div>
//   );
// }

// export default App;






