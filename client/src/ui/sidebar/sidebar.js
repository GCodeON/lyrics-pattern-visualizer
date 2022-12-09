import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Nav from '../nav';
import Search from '../search';

import './sidebar.scss';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <Nav></Nav>
            <Search></Search>
        </div>
    );
    
}

export default Sidebar;