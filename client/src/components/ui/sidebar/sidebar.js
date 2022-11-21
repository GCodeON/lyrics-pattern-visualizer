import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaHome, FaMusic, FaUserCircle, FaSearch , FaUser } from "react-icons/fa";
import './sidebar.scss';


import { Link } from 'react-router-dom'


const Sidebar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState({});
    const [searchQuery, setQuery] = useState('');

    useEffect(() => {
     }, [searchQuery]);
     
    const AuthEndPoint = 'https://accounts.spotify.com/authorize';

    const redirectUri = 'http://localhost:3000/callback/';
    
    const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state"
    ];
    
    const loginUri = `${AuthEndPoint}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
    
    const searchHandler = () => {
        let queryString = searchQuery.length > 1 ? `?q=${searchQuery}` :  '';

        axios.get(`/api/spotify/search?q=${searchQuery}`)
        .then((res) => {
            if(res.data) {
                setSearch(res.data);
                setQuery('');
                navigate(`/search${queryString}`, { state: res.data });
            }
        })
    }

    const changeHandler = (evt) => {
        setQuery(evt.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchHandler();
        }
    }

    const loginhHandler = () => {
        console.log('login');
    }
    

    return (
        <div className="sidebar">
            <div className="title">
                <h4>DECODED</h4>
            </div>
            <div className="search">
                <input 
                    value={searchQuery} 
                    onChange={changeHandler}  
                    onKeyUp={handleKeyPress}
                >
                </input>
                <FaSearch 
                    className="icon" 
                    onClick={searchHandler} 
                />
            </div>
            <nav className="links">
                <li>
                    <FaHome/>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <FaUserCircle />
                    <Link to="/artists">Artists</Link> 
                </li>
                <li>
                    <FaMusic/>
                    <Link to="/songs">Songs</Link> 
                </li>
            </nav>
            <a href={loginUri} id="sign-in" target="_blank">
                <FaUser
                    className="icon" 
                    // onClick={loginhHandler} 
                />
            </a>
        </div>
    );
    
}

export default Sidebar;