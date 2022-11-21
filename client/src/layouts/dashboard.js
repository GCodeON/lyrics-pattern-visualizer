import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Sidebar from '../components/ui/sidebar/sidebar';
import './dashboard.scss';


const Dashboard = (props) => {
    const classes =`dashboard ${props.className ? props.className : ''}`;

    window.onSpotifyWebPlaybackSDKReady = () => {};

    async function waitForSpotifyWebPlaybackSDKToLoad () {
        return new Promise(resolve => {
            if (window.Spotify) {
            resolve(window.Spotify);
            } else {
            window.onSpotifyWebPlaybackSDKReady = () => {
                resolve(window.Spotify);
            };
            }
        });
    };

    async function waitUntilUserHasSelectedPlayer (sdk) {
        return new Promise(resolve => {
          let interval = setInterval(async () => {
            let state = await sdk.getCurrentState();
            if (state !== null) {
              resolve(state);
              clearInterval(interval);
            }
          });
        });
      };
      (async () => {
        const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
        
        const sdk = new Player({
          name: "Web Playback SDK",
          volume: 1.0,
          getOAuthToken: callback => { callback(process.env.REACT_APP_SPOTIFY_TOKEN); }
        });

        console.log('sdk', sdk);

        sdk.on("player_state_changed", state => {
            console.log('state', state);
          // Update UI with playback state changes
        });
        let connected = await sdk.connect();
        if (connected) {
            console.log('connected', connected);
          let state = await waitUntilUserHasSelectedPlayer(sdk);

          console.log('state', state);

          await sdk.resume();
          await sdk.setVolume(0.5);

          let {
            id,
            uri: track_uri,
            name: track_name,
            duration_ms,
            artists,
            album: {
              name: album_name,
              uri: album_uri,
              images: album_images
            }
          } = state.track_window.current_track;
          console.log(`You're listening to ${track_name} by ${artists[0].name}!`);
        }
      })();



    useEffect(() => {

       waitForSpotifyWebPlaybackSDKToLoad();

       console.log('player');

          
    }, []);

    return (
        <div className={classes}>
            <Sidebar></Sidebar>
            <Outlet />
        </div>
    )
}

export default Dashboard;