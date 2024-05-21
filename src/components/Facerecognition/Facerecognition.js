import React from 'react';
import './facerecognition.css';

const Facerecognition = (props) => {
    const {imageUrl, box} = props;

    return (
        <div className='center mt3'>
            <div className='absolute'>
                <img id='imageInput' src={imageUrl} alt='' style={{width: '500px', height: 'auto'}} />
            </div>  
            <div className='bounding-box' style={{top:box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
        </div>
    )
}

export default Facerecognition;



// import React from 'react';
// import './facerecognition.css';

// const Facerecognition = (props) => {
//     const {imageUrl, box} = props;
//     // Convert numerical box values to strings with 'px' unit
//     const boundingBoxStyle = {
//         top: `${box.topRow}px`,
//         left: `${box.leftCol}px`,
//         right: `${box.rightCol}px`,
//         bottom: `${box.bottomRow}px`
//     };

//     return (
//         <div className='center mt3'>
//             <div className='absolute'>
//                 <img id='imageInput' src={imageUrl} alt='' style={{width: '500px', height: 'auto'}} />
//             </div>  
//             <div className='bounding-box' style={{boundingBoxStyle}}></div>
//         </div>
//     )
// }

// export default Facerecognition;