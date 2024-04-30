import React from 'react';

const Facerecognition = (props) => {
    const {imageUrl} = props;

    return (
        <div className='center mt3'>
            <img src={imageUrl} alt=''/>
        </div>
    )
}

export default Facerecognition;