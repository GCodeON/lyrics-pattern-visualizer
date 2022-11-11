import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './styles.scss';

const Search = () => {
    const location = useLocation();
    const [albums, setAlbums] = useState({});
    const [artists, setArtists] = useState({});
    const [tracks, setTracks] = useState({});

    useEffect(() => {
        if(location.state !== null) {
            console.log('search page', location.state);
            setAlbums(location.state.albums);
            setArtists(location.state.artists);
            setTracks(location.state.tracks);
        }
    }, []);

    useEffect(() => {
       console.log('state set', albums, tracks, artists);
    }, [albums, tracks, artists]);

    let albumList = () => {
        let list;
        { albums.items && (
            list =
            <ul>
                {albums.items.map((album,index) => (

                    <Link 
                    key={index}
                    className='link'
                    to={`/album/${album.id}`} 
                    >
                        <li>
                            <p>{ album.name }</p>
                        </li>
                    </Link>
                ))}
            </ul>
        )}

        return list;
    }

    return (
        <div className='search-page'>
            <div className='albums'>
                <h2>Albums</h2>
                { albumList() }
            </div>
        </div>
    )
}

export default Search;

