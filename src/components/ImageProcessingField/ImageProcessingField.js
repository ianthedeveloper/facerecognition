import React from "react";
import './imageProcessingField.css';

const imageProcessingField = (props) => {
    const {onInputChange, onButtonSubmit} = props;

    return (
        <div>
            <p className="textPrompt f4">{"Submit your image link for me to detect the faces on it. Just give me a try"}  </p>
            <div className="inputField center br3 shadow-5" >
                <div className="center pa4">
                    <input 
                        className="mr0 pa2 w-70% f3" type="text"
                        onChange={onInputChange}
                    />
                    <button 
                        className="detectBtn pa4 w-30 f3 link grow ph3 pv2 dib white" 
                        type="submit"
                        onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default imageProcessingField;