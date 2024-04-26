import React from 'react';
import './logo.css';
import facelogo from './facelogo.png';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div>
            <Tilt className=" Tilt  ma3 br3 parallax-effect" perspective={200}  style={{ width: '121px', height: '121px'}}>
                <div className="inner-element">
                    <img className="logo"  src={facelogo} alt='logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;