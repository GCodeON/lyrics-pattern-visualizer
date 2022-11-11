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


    let artistList = () => {
        let list;
        { artists.items && (
            list =
            <ul>
                {artists.items.map((item,index) => (

                    <Link 
                    key={index}
                    className='link'
                    to={`/artist/${item.id}`} 
                    >
                        <li>
                            <p>{ item.name }</p>
                        </li>
                    </Link>
                ))}
            </ul>
        )}

        return list;
    }

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


    let trackList = () => {
        let list;
        { tracks.items && (
            list =
            <ul>
                {tracks.items.map((item,index) => (

                    <Link 
                    key={index}
                    className='link'
                    to={`/songs/${item.id}`} 
                    >
                        <li>
                            <p>{ item.name }</p>
                        </li>
                    </Link>
                ))}
            </ul>
        )}

        return list;
    }

    return (
        <div className='search-page'>
            <h1>Search</h1>
            <div className='results'>
                <div className='albums'>
                    <h2>Albums</h2>
                    { albumList() }
                </div>
                <div className='artists'>
                    <h2>Artists</h2>
                    { artistList() }
                </div>
                <div className='tracks'>
                    <h2>Tracks</h2>
                    { trackList() }
                </div>
            </div>
        </div>
    )
}

export default Search;

