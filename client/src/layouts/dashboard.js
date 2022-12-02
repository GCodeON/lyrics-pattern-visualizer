import { Outlet, useNavigate, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Sidebar from '../ui/sidebar/sidebar';
import SpotifyWebPlayer from '../ui/spotify-player';
import './styles.scss';

const Dashboard = (props) => {
  // const classes =`${props.className ? props.className : ''}`;

  // const navigate = useNavigate();
  
  useEffect(() => {
   
  },[]);



  return (
    <div className="root-route">
      <div className="dashboard">
        <Sidebar></Sidebar>
        <div className="container">
          <Outlet />
        </div>
      </div>
      <div className="fixed-footer">
        <SpotifyWebPlayer />
      </div>
    </div>
  )
}

export default Dashboard;