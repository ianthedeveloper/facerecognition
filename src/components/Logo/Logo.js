import React from 'react';
import './logo.css';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div>
            <Tilt className='Tilt ma3 br3'  style={{ width: '121px', height: '121px'}}>
                <div>
                    <h1>React Parallax Tilt 👀</h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;