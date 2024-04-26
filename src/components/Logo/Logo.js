import React from 'react';
import './logo.css';
import facelogo from './facelogo.png';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
            <Tilt className=" Tilt  ma3 mt0  br3 shadow-5 pointer parallax-effect" perspective={200}  style={{ width: '121px', height: '121px'}}>
                <div className="inner-element">
                    <img className="logo"  src={facelogo} alt='logo'/>
                </div>
            </Tilt>
    )
}

export default Logo;