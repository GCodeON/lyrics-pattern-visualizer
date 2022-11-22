import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaUser, FaPowerOff } from "react-icons/fa";

import  './styles.scss';

const Login = () => {
    
    const AuthEndPoint = 'https://accounts.spotify.com/authorize';

    const redirectUri = 'http://localhost:3000/callback/';
    
    const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state"
    ];
    
    const loginUri = `${AuthEndPoint}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

    const onLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const Spotify_User = () => {
        let icon;
        if (localStorage.getItem('spotify_token')) { 
            icon =
            <FaUser className="icon" onClick={onLogout}/>
        } else {
            icon =
            <a href={loginUri} id="sign-in">
                <FaPowerOff className="icon"/>
            </a>
        }

        return icon;
    }

    return (
        <div className="login">
           { Spotify_User() }
        </div>
    )

}

export default Login;