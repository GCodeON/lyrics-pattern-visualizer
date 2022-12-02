import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FaHome, FaMusic, FaUserCircle, FaSearch } from "react-icons/fa";
import Login from '../login/';
import Nav from '../nav/';

import './sidebar.scss';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <Login></Login>
            <div className="title">
                <h1>DECODED</h1>
            </div>
            <Nav></Nav>
        </div>
    );
    
}

export default Sidebar;