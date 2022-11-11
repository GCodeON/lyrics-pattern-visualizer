import {useLocation} from 'react-router-dom';
import React from "react";
import axios from 'axios';

import './styles.scss';

const Search = () => {
    const location = useLocation();

    console.log('search page', location.state);

    return (
        <div className="search-page">
            
        </div>
    )
}

export default Search;

