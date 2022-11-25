import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import Sidebar from '../components/ui/sidebar/sidebar';
import './dashboard.scss';

const Dashboard = (props) => {
  const classes =`${props.className ? props.className : ''}`;
  const [spotifyToken, setSpotifyToken] = useState('');

  useEffect(() => {
    setSpotifyToken(
      localStorage.getItem('spotify_token') 
      ? localStorage.getItem('spotify_token') 
      : process.env.REACT_APP_SPOTIFY_TOKEN
    )
  },[]);

  function spotifyCallback(state) {
    console.log('callback state', state);
  }

  return (
    <div className={classes}>
      <div className="dashboard">
        <Sidebar></Sidebar>
        <div>
          <Outlet />
          <div className="spotify-web-player">
            <SpotifyPlayer
              token={spotifyToken}
              syncExternalDevice={true}
              syncExternalDeviceInterval={10}
              play={true}
              callback={(state) => spotifyCallback(state)}

            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;