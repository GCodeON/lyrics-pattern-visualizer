import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Login from '../login';
import Nav from '../nav';
import Search from '../search';

import './sidebar.scss';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <Nav></Nav>
            <Search></Search>
            <Login></Login>
        </div>
    );
    
}

export default Sidebar;