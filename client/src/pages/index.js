import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from "react-router-dom";
import axios from 'axios';

import './styles.scss';

const Home = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    const [currentlyPlayingArtist, setCurrentlyPlayingArtist] = useState(null);
    const [recentlyPlayed, setRecentlyPlayed]   = useState({});

    useEffect(() => {
        let active = JSON.parse(window.localStorage.getItem('active'));
        if(active) {
            setCurrentlyPlaying(active);
        }
    }, []);

    useEffect(() => {
        if(currentlyPlaying.artists) {
            let artist = currentlyPlaying.artists[0];
            setCurrentlyPlayingArtist(artist)
        }  
    }, [currentlyPlaying]);


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

    return (
        <div className="home page">
            { currentlyPlayingArtist && (
                <div className="current">
                    <h3>Currently Playing</h3>
                    <Link 
                    className="link"
                    to={`/song/${currentlyPlaying.id}`} 
                    >
                        <img className="track-image" src={currentlyPlaying.image}/>
                        <h1 className="track-name">
                            { currentlyPlaying.name }
                        </h1>
                    </Link>
                    <Link 
                    className="link"
                    to={`/artist/${currentlyPlayingArtist.id}`} 
                    >
                        <h1 className="track-name">
                            { currentlyPlayingArtist.name }
                        </h1>
                    </Link>
                </div>
            )}
            {/* <div className='tracks'>
                <h3>Recently Played</h3>
                { trackList() }
            </div> */}
        </ div>
    );
}

export default Home;
