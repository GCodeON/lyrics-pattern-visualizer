import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaSearch } from "react-icons/fa";
import './styles.scss';

const Search = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState({});
    const [searchQuery, setQuery] = useState('');
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
    }, [searchQuery]);

    const searchHandler = () => {
        let queryString = searchQuery.length >= 1 ? `?q=${searchQuery}` :  '';

        if(queryString) {
            axios.get(`/api/spotify/search?q=${searchQuery}`)
            .then((res) => {
                if(res.data) {
                    setSearch(res.data);
                    setQuery('');
                    navigate(`/search${queryString}`, { state: res.data });
                }
            })
        }
    }

    function showOnClick() {
        setShowInput(true);
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
            <FaSearch 
                className="icon" 
                onClick={showOnClick} 
            />
            { showInput && (
                <input 
                    value={searchQuery} 
                    onChange={changeHandler}  
                    onKeyUp={handleKeyPress}
                />
            )}
        </div>
    );
    
}

export default Search;