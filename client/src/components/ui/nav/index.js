import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaHome, FaMusic, FaUserCircle } from "react-icons/fa";
import './styles.scss';

const Nav = () => {

    return (
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
    );
    
}

export default Nav;