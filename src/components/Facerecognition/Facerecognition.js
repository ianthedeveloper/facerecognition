import React from 'react';

const Facerecognition = (props) => {
    const {imageUrl} = props;

    return (
        <div className='center mt3'>
            <div className='absolute'>
                <img id='faceData' src={imageUrl} alt='' style={{width: '500px', height: 'auto'}}  />
            </div>  
        </div>
    )
}

export default Facerecognition;