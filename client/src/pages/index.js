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
    }, []);

    useEffect(() => {
        console.log('set artist pre')
        if(currentlyPlaying.artists) {
            let artist = currentlyPlaying.artists[0].name;
            console.log('set artist post', artist);
            setCurrentArtist(artist);
        }  
    }, [currentlyPlaying]);

    useEffect(() => {
        console.log('set artist pre')
        if(currentArtist) {
          console.log('name set');
        }  
    }, [currentArtist]);

            // axios.get(`/api/spotify/recently-played`)
        // .then((recent) => {
        //     console.log('recent', recent)
        //     if(recent.data.items) {
        //         setRecentlyPlayed(recent.data.items);
        //     }
        // })


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
        <div className="home-page">
            <h1>Currently Playing</h1>
            { currentlyPlaying && (
                <div className="current">
                    <p className="track-name">
                        { currentlyPlaying.name }
                    </p>
                    <p className="track-name">
                        { currentArtist }
                    </p>
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
