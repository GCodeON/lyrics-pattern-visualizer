import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaHome, FaMusic, FaUserCircle, FaSearch } from "react-icons/fa";
import './sidebar.scss';


import { Link } from 'react-router-dom'


const Sidebar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState({});
    const [searchQuery, setQuery] = useState('');

    useEffect(() => {
     }, [searchQuery]);

    
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
        
        </div>
    );
    
}

export default Sidebar;