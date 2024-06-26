import React from 'react';
import GenericButton from './GenericButton';

import { Link } from 'react-router-dom';

export default function ResponsiveBar(){
    return (
        <>
            <div className='responsiveBar'>
                <div>
                <Link to="volunteer/my-profile">
                    <GenericButton text='My Profile'>
                    </GenericButton>
                </Link>
                </div>

                <div>
                <Link to='volunteer/logout'>
                    <GenericButton text='Log out'>
                    </GenericButton>
                </Link>
                </div>
            </div>
        </>
    );
}