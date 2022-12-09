import { useLocation, Link, useSearchParams, useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Login from '../../ui/login/';
import './styles.scss';

const Auth = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem('spotify_token')) { 
    //         // window.location.replace("/");
    //           navigate('/');
    //     } else {
    //         const spotify_token = getTokenFromUrl().access_token;
    //         localStorage.setItem('spotify_token', spotify_token );
    //         window.location.reload("/");
    //     }
    // }, []);

    // const getTokenFromUrl = () => {
    //     return window.location.hash
    //     .substring(1)
    //     .split('&')
    //     .reduce((initial, item) => {

    //         let parts = item.split("=");

    //         initial[parts[0]] = decodeURIComponent(parts[1]);
            
    //         return initial;
    //     }, {});
    // }

    return (
        <div className='auth'>
            <Login></Login>
        </div>
    )
}

export default Auth;
