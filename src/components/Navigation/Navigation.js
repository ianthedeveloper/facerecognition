import React from 'react';
import navigation from './navigation.css';

const Navigation = ({onRouteChange, isUserSignedin}) => {
    if(isUserSignedin){
        return(
            <div className='navbar mr3 pointer'>
                <p className='f3 link dim underline pointer' onClick={() => onRouteChange('signout')}>Sign Out</p>
            </div>
        )
    }else{
        return(
            <div className='navbar mr3 pointer'>
                <p className='f3 pr4 link dim underline pointer' onClick={() => onRouteChange('signin')}>Sign in</p>
                <p className='f3 link dim underline pointer' onClick={() => onRouteChange('register')}>Register</p>
            </div>
        )
    }
}

export default Navigation;




