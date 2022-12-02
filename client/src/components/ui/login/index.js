import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaUser, FaPowerOff } from "react-icons/fa";

import Search from '../search/';
import  './styles.scss';

const Login = () => {
    
    const AuthEndPoint = 'https://accounts.spotify.com/authorize';

    const redirectUri = 'http://localhost:3000/callback/';
    
    const scopes = [
        "streaming",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-playback-position",
        "user-top-read"
    ];
    
    const loginUri = `${AuthEndPoint}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`;

    const onLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }
    const onLogin = () => {
        window.location.href = loginUri;
    }

    const Spotify_User = () => {
        let icon;
        if (localStorage.getItem('spotify_token')) { 
            icon =
            <div className='logout' onClick={onLogout}>
                {/* <p className=''>Logout</p> */}
                <FaUser className="icon"/>
            </div>
        } else {
            icon =
            <div className='login' onClick={onLogin}>
                {/* <p className=''>Login</p> */}
                <FaPowerOff className="icon"/>
            </div>
        }

        return icon;
    }

    return (
        <div className="login">
            <Search></Search>
           { Spotify_User() }
        </div>
    )

}

export default Login;