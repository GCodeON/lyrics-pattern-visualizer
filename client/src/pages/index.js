import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './styles.scss';

const Home = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    const [currentArtist, setCurrentArtist] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed]   = useState({});

    useEffect(() => {

        axios.get(`/api/spotify/currently-playing`)
        .then((current) => {
            console.log('current', current)
            if(current.data.currently_playing_type !== "ad") {
                axios.get(`/api/spotify/track/${current.data.item.id}`)
                .then((track) => {
                    setCurrentlyPlaying(track.data);
                })  
            }
        })  

        // axios.get(`/api/spotify/recently-played`)
        // .then((recent) => {
        //     console.log('recent', recent)
        //     if(recent.data.items) {
        //         setRecentlyPlayed(recent.data.items);
        //     }
        // })
    }, []);

    useEffect(() => {
        if(currentlyPlaying.artists) {
            let artist = currentlyPlaying.artists[0].name;
            setCurrentArtist(artist);
        }  
    }, [currentlyPlaying]);

    useEffect(() => {
        axios.get(`/api/spotify/recently-played`)
        .then((recent) => {
            console.log('recent', recent)
            if(recent.data.items) {
                setRecentlyPlayed(recent.data.items);
            }
        })
    }, [currentArtist]);


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
            <h3>Currently Playing</h3>
            { currentlyPlaying && (
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
            )} 
            {/* <div className='tracks'>
                <h3>Recently Played</h3>
                { trackList() }
            </div> */}
        </ div>
    );
}

export default Home;
