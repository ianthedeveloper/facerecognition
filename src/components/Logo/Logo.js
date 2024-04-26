import React from 'react';
import './logo.css';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div>
            <Tilt className='Tilt'>
                <div style={{ height: '300px', backgroundColor: 'darkgreen' }}>
                    <h1>React Parallax Tilt 👀</h1>
                </div>
            </Tilt>

        </div>
    )
}

export default Logo;