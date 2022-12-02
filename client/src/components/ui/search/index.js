import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaSearch } from "react-icons/fa";
import './styles.scss';

const Search = () => {
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
    );
    
}

export default Search;