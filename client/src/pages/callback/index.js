import { useLocation, Link, useSearchParams  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.scss';

const Callback = () => {

    useEffect(() => {
        const spotify_token = getTokenFromUrl().access_token;
        localStorage.setItem('spotify_token', spotify_token );
        console.log('spotify_token', spotify_token)
    }, []);

    const getTokenFromUrl = () => {
        return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {

            let parts = item.split("=");

            initial[parts[0]] = decodeURIComponent(parts[1]);
            
            return initial;
        }, {});
    }

    return (
        <div className=''>

        </div>
    )
}

export default Callback;

