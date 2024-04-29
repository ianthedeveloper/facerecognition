import React from "react";
import './imageProcessingField.css';

const imageProcessingField = () => {
    return (
        <div>
            <p className="textPrompt f4">{"Magic: I'll detect the faces in your pictures. Give me a try"}  </p>
            <div className="inputField center br3 shadow-5" >
                <div className="center pa4">
                    <input className="mr0 pa2 w-70% f3" type="text"/>
                    <button className="detectBtn pa4 w-30 f3 link grow ph3 pv2 dib white" type="submit">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default imageProcessingField;