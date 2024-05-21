import React from 'react';
import './facerecognition.css';

const Facerecognition = (props) => {
    const {imageUrl, box} = props;

    return (
        <div className='center mt3'>
            <div className='absolute'>
                <img id='imageInput' src={imageUrl} alt='' style={{width: '500px', height: 'auto'}}  />
            </div>  
            <div className='bounding-box' style={{top:box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}  ></div>
        </div>
    )
}

export default Facerecognition;