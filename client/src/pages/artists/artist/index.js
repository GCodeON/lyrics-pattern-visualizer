import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

import './styles.scss';

const Artist = () => {
    const { id }   = useParams();
    const [artist, setArtist] = useState({});
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get(`/api/spotify/artist/${id}`)
        .then((spotifyArtist) => {
            setArtist(spotifyArtist.data);
        })  
    }, []);

    useEffect(() => {
        console.log('artist data', artist);
        axios.get(`/api/spotify/artist/albums/${id}`)
        .then((res) => {
            console.log('res albums', res.data);
            setAlbums(res.data);
        });

    }, [artist]);

    useEffect(() => {
      console.log('albums', albums)
    }, [albums]);



    const albumList = () => {
        let list;
        if (albums) { 
            list =
            <ul>
                {albums.map((album,index) => (

                    <Link 
                    key={index}
                    className="link"
                    to={`/album/${album.id}`} 
                    >
                    <li>
                        <p>{ album.name }</p>
                    </li>
                    </Link>
                ))}
            </ul>
        }
        return list;
    }


    const artistImage = () => {
        let photo;

        { artist.images && (
            photo = <img className='photo' src={artist.images[1].url } /> 
        )}

        return photo;
    }



    return (
        <>
            {  artist && (
            <div className='artist-page'>
                <h1>{ artist.name }</h1>
                { artistImage() }
                <div className='albums'>
                    <h3>Albums</h3>
                    { albumList() }
                </div>
            </div>
            )}
        </>
      );
}

export default Artist;
