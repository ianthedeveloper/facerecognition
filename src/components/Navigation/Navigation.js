import React from 'react';
import navigation from './navigation.css';

const Navigation = ({onRouteChange}) => {
    return (
        <div className='navbar mr3 pointer'>
            <p className='f3 link dim underline pointer' onClick={() => onRouteChange('signin')}>Sign Out</p>
        </div>
    )
}

export default Navigation;