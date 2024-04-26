import React from "react";
import './imageProcessingField.css';

const imageProcessingField = () => {
    return (
        <div className="imageInputContainer">
                <p>{"Share your image link correct recognition. Try it out"}  </p>
                <duv className="imputField" >
                    <div>
                        <input className="mr0"  style={{width: '70%'}} type="text"/>
                        <button className="detectBtn ml0" style={{width: '30%'}} type="submit">Detect</button>
                    </div>
                </duv>
        </div>
    )
}

export default imageProcessingField;