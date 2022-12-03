import { Outlet, useNavigate, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';

const SpotifyWebPlayer = (props) => {
  const classes =`${props.className ? props.className : ''}`;
  const [spotifyToken, setSpotifyToken] = useState('');
  const [ playerState, setPlayerState] = useState(true);
  const [ activeTrack, setActiveTrack] = useState({});
  const [ songChanged, setSongChange] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setSpotifyToken(localStorage.getItem('spotify_token'));
    console.log('get props', props);
  },[]);

  useEffect(() => {
    var currentPage = window.location;
    console.log('page path', currentPage);

    if(songChanged) {
      window.localStorage.setItem('active', JSON.stringify(activeTrack));
    //  if(currentPage.pathname == '/') {
    //   navigate(0);
    //   // window.location.reload();
    //  }
      props.update(activeTrack);
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
    console.log('state', state);
    if(state.type == "status_update" && state.status !== "ERROR" && state.status == "READY" ) {
      console.log("ready");
    } else if(state.type == "player_update") {
      console.log('player', state);
      // props.update()
    } else if(state.type == "device_update") {
      // console.log('device');
    } else if(state.type == "track_update") {
      console.log('track');
      let previousTrack = JSON.parse(window.localStorage.getItem('active'));
      compareTrack(previousTrack ? previousTrack : {}, state.track);
    }
  }

  return (
    <div className="spotify-web-player">
      {spotifyToken && activeTrack && (
          <SpotifyPlayer
            name={'DECODED Web Player'}
            callback={(state) => spotifyCallback(state)}
            syncExternalDeviceInterval={10}
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
      )}
    </div>
  )
}

export default SpotifyWebPlayer;