import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from "react-router-dom";
import axios from 'axios';

import './styles.scss';

const Home = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    const [currentArtist, setCurrentArtist] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed]   = useState({});

    const context = useOutletContext();

    useEffect(() => {
        let active = JSON.parse(window.localStorage.getItem('active'));
        if(active) {
            setCurrentlyPlaying(active);
        } else {
            setCurrentlyPlaying({});
        }
    }, []);

    useEffect(() => {
        if(currentlyPlaying.artists) {
            let artist = currentlyPlaying.artists[0].name;
            setCurrentArtist(artist);
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
            { currentArtist && (
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
                        <h1 className="track-name">
                            { currentArtist }
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
