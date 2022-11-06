import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from "react-router-dom";
import axios from 'axios';

import './styles.scss';

const Artist = () => {
    const { id }              = useParams();
    const location            = useLocation();
    const [tracks, setTracks] = useState([]);
    const [album, setAlbum]   = useState([]);

    useEffect(() => {
        axios.get(`/api/spotify/albums/${id}`)
        .then((spotifyAlbum) => {
            console.log('album info', spotifyAlbum);
            setAlbum(spotifyAlbum.data);
            setTracks(spotifyAlbum.data.tracks.items);
        })  
    }, []);


    const trackList = () => {
        let list;
        if (tracks) { 
            list =
            <ul>
                {tracks.map((track,index) => (

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
        <>
            {  album && (
            <div className='album-page'>
                <h1>{ album.name }</h1>
                <div className='tracks'>
                    <h3>Tracks</h3>
                    { trackList() }
                </div>
            </div>
            )}
        </>
      );
}

export default Artist;
