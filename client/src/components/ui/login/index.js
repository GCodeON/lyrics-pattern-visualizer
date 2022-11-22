import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaUser } from "react-icons/fa";

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

    return (
        <div className="login">
            <a href={loginUri} id="sign-in">
                <FaUser className="icon"/>
            </a>
        </div>
    )

}

export default Login;