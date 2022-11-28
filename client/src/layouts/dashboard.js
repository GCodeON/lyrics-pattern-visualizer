import { Outlet, useNavigate, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import Sidebar from '../components/ui/sidebar/sidebar';
import './dashboard.scss';

const Dashboard = (props) => {
  const classes =`${props.className ? props.className : ''}`;
  const [spotifyToken, setSpotifyToken] = useState('');
  const [ playerState, setPlayerState] = useState(true);
  const [ activeTrack, setActiveTrack] = useState({});
  const [ songChanged, setSongChange] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setSpotifyToken(localStorage.getItem('spotify_token'));
  },[]);

  useEffect(() => {
    var currentPage = window.location;
    console.log('page path', currentPage);

    if(songChanged) {
      window.localStorage.setItem('active', JSON.stringify(activeTrack));
     if(currentPage.pathname == '/') {
      // navigate(0);
      window.location.reload(false);
     }
    }
  },[songChanged]);

  function compareTrack(old, updated) {
    if(updated.name !== old.name) {
      console.log('different');
      setActiveTrack(updated);
      setSongChange(true);
    } else {
      console.log('same');
      setSongChange(false);
    }
  }

  const spotifyCallback = (state) => {
    if(state.type == "status_update" && state.status !== "ERROR" && state.status == "READY" ) {
      console.log("ready");
    } else if(state.type == "player_update") {
      // console.log('player');
    } else if(state.type == "device_update") {
      // console.log('device');
    } else if(state.type == "track_update") {
      console.log('track');
      let previousTrack = JSON.parse(window.localStorage.getItem('active'));
      compareTrack(previousTrack ? previousTrack : {}, state.track);
    }
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
        {spotifyToken && activeTrack && (
          <div className="spotify-web-player">
            <SpotifyPlayer
              name={'DECODED Web Player'}
              callback={(state) => spotifyCallback(state)}
              syncExternalDeviceInterval={5}
              persistDeviceSelection={true}
              syncExternalDevice={true}
              token={localStorage.getItem('spotify_token')}
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
        )}
      </div>
    </div>
  )
}

export default Dashboard;