import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import SpotifyPlayer from 'react-spotify-web-playback';

import './styles.scss';

const Home = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    const [currentArtist, setCurrentArtist] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed]   = useState({});

    useEffect(() => {
        let active_song = window.spotify_active_song;
        if(active_song) {
            setCurrentlyPlaying(active_song.track)
        }
    }, []);

    // useEffect(() => {
    //     if(currentlyPlaying.artists) {
    //         let artist = currentlyPlaying.artists[0].name;
    //         setCurrentArtist(artist);
    //     }  
    // }, [currentlyPlaying]);


    const trackList = () => {
        let list;
        if (recentlyPlayed) { 
            list =
            <ul>
                {recentlyPlayed.map((track,index) => (

                    <Link 
                    key={index}
                    className="link"
                    to={`/song/${track.id}`} 
                    >
                    <li>
                        <p>{ track.name }</p>
                    </li>
                    </Link>
                ))}
            </ul>
        }
        return list;
    }

    const currentTrack = () => {
        let list;
        if (currentlyPlaying) { 
            <div className="current">
                <Link 
                className="link"
                to={`/song/${currentlyPlaying.id}`} 
                >
                    <h1 className="track-name">
                        { currentlyPlaying.name }
                    </h1>
                    <h1 className="track-name">
                        { currentArtist }
                    </h1>
                </Link>
            </div>
        }
        return list;
    }


    return (
        <div className="home page">
            <h3>Currently Playing</h3>
            { currentTrack }
            {/* <div className='tracks'>
                <h3>Recently Played</h3>
                { trackList() }
            </div> */}
        </ div>
    );
}

export default Home;
