import React from "react";
import './imageProcessingField.css';

const imageProcessingField = () => {
    return (
        <div className="imageInputContainer pa3 shadow-5">
                    <p className="textPrompt">{"Share your image link for correct recognition. Try it out"}  </p>
                <div className="inputField" >
                    <div className="pa1">
                        <input className="mr0"  style={{width: '70%'}} type="text"/>
                        <button className="detectBtn pa1" style={{width: '30%'}} type="submit">Detect</button>
                    </div>
                </div>
        </div>
    )
}

export default imageProcessingField;