import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageProcessingField from './components/ImageProcessingField/ImageProcessingField';
import Facerecognition from './components/Facerecognition/Facerecognition';
import { jsx } from 'react/jsx-runtime';

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
        route: 'signin',
        isUserSignedin: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
    }
  }

  postUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (result) => {
    const faceData = result.outputs[0].data.regions[0].region_info.bounding_box;
    const imageInput = document.getElementById("imageInput");
    const width = Number(imageInput.width);
    const height = Number(imageInput.height);
    console.log("Results:", result);

    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,

      // rightCol: width - (faceData.right_col * width),
      rightCol: (1 - faceData.right_col) * width,

      // bottomRow: height - (faceData.bottom_row * height),
      bottomRow: (1 - faceData.bottom_row) * height,
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
    .then(response => {
      if(response){
        fetch('http://localhost:3003/image', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
    })
    .then(result =>  {
      this.displayFaceLocation(this.calculateFaceLocation(result))
    })
    .catch(error => console.log('Ooops! There was an error', error));
  }

  onRouteChange = (route) => {
    console.log("Current route:", route)
    if(route === 'signout'){
      this.setState({isUserSignedin: false})
    }else if(route === "home"){
      this.setState({isUserSignedin: true})
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg className="particlesBg" num={183} type="fountain" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isUserSignedin={this.state.isUserSignedin}/>
        { this.state.route === 'home' ?
          <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageProcessingField 
              onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  
            />
            <Facerecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>:
            (
              this.state.route === 'signin' ?
              <Signin onRouteChange={this.onRouteChange}/> : 
              <Register onRouteChange={this.onRouteChange} postUser={this.postUser}/>
            )
        }
      </div>
    );
  }
}

export default App;



// FaceBox Calculations

// const top = box.top_row * height
// const left = box.left_col * width
// const boxWidth = (box.right_col - box.left_col) * width
// const boxHeight = (box.bottom_row - box.top_row) * height




// My Own Version Of FaceBox Calculations:

// topRow: faceData.top_row * height;
// bottomRow: height - (faceData.bottom_row * height);
 














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
