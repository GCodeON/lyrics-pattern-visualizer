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
    console.log('track', state);
    window.spotify_active_song = state;
  }

  return (
    <div className={classes}>
      <div className="dashboard">
        <Sidebar></Sidebar>
        <div>
          <Outlet />
          <div className="spotify-web-player">
            <SpotifyPlayer
              name={'DECODED Web Player'}
              callback={(state) => spotifyCallback(state)}
              syncExternalDeviceInterval={5}
              persistDeviceSelection={true}
              syncExternalDevice={true}
              token={spotifyToken}
              play={true}
              styles={{
                activeColor       : '#fff',
                bgColor           : '#000',
                color             : '#fff',
                loaderColor       : '#fff',
                trackArtistColor  : '#ccc',
                trackNameColor    : '#fff',
                sliderHandleColor : '#fff'

              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;