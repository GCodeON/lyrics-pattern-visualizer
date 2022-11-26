import { Outlet } from "react-router-dom";
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
  useEffect(() => {
    setSpotifyToken(localStorage.getItem('spotify_token'));
  },[]);

  useEffect(() => {
    console.log('active track set', activeTrack);
    window.localStorage.setItem('active', JSON.stringify(activeTrack));
  },[playerState]);

  useEffect(() => {
    console.log('song changed');
    if(songChanged) {
      console.log('song chnaged twice');
      let previousTrack = JSON.parse(window.localStorage.getItem('active'));
      // window.location.reload();
      compareTrack(previousTrack, activeTrack)
    }
  },[songChanged]);

  function compareTrack(old, updated) {
    if(updated.name !== old.name) {
      console.log('different');
      setSongChange(true);
    } else {
      console.log('same');
      setSongChange(false);
    }
  }

  const spotifyCallback = (state) => {
    console.log('state callback interval', state);
    if(state.track.id !== '') {
      setPlayerState(true)
      if(state.track.name.length) {
        window.localStorage.setItem('active', JSON.stringify(activeTrack));
        setActiveTrack(state.track);

        let previousTrack = JSON.parse(window.localStorage.getItem('active'));
        if(previousTrack.name == state.track.name) {

          setActiveTrack(state.track);
          compareTrack(previousTrack, state);
          setPlayerState(false)
        }
        // if(state.track.name !== previousTrack.name) {
        //   setSongChange(true);
        // }
      }
    } else {
      setPlayerState(false)
    }
  }

  return (
    <div className={classes}>
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
        )}
      </div>
    </div>
  )
}

export default Dashboard;