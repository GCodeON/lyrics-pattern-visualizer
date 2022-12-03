import { Outlet, useNavigate, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Sidebar from '../ui/sidebar/sidebar';
import SpotifyWebPlayer from '../ui/spotify-player';
import './styles.scss';

const Dashboard = (props) => {
  // const classes =`${props.className ? props.className : ''}`;

  // const navigate = useNavigate();
  const [ activeTrack, setActiveTrack] = useState({});

  useEffect(() => {
    console.log('dashboard updated track:', activeTrack);
  },[activeTrack]);


const getActive = (track) => {
  // console.log('get active track on dashboard', track);
  setActiveTrack(track);
}


  return (
    <div className="root-route">
      <div className="dashboard">
        <Sidebar></Sidebar>
        <div className="container">
          <Outlet />
        </div>
      </div>
      <div className="fixed-footer">
        <SpotifyWebPlayer update={getActive} />
      </div>
    </div>
  )
}

export default Dashboard;