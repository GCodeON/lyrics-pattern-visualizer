import { useLocation, Link, useSearchParams  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.scss';

const Search = () => {
    const location = useLocation();
    const [albums, setAlbums] = useState({});
    const [artists, setArtists] = useState({});
    const [tracks, setTracks] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [loaded, setLoaded] = useState(false);


    const params = searchParams.get('q');


    useEffect(() => {
        if(location.state) {
            console.log('search page', location.state);
            setResults(location.state);
        } else {
            console.log('search no query');
            setLoaded(false);
        }
    }, []);

    useEffect(() => {
        if(params) {
            axios.get(`/api/spotify/search?q=${params}`)
            .then((res) => {
                if(res.data) {
                    setResults(res.data);
                }
            })
        }
    }, [params]);


    const setResults = (results) => {
        setLoaded(true);
        setAlbums(results.albums);
        setArtists(results.artists);
        setTracks(results.tracks);
    }

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
                    to={`/song/${item.id}`} 
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

            { loaded && (
                <div className='search-loaded'>
                    <h1>Search Results</h1>
                    <div className='results'>
                        <div className='artists'>
                            <h2>Artists</h2>
                            { artistList() }
                        </div>
                        <div className='albums'>
                            <h2>Albums</h2>
                            { albumList() }
                        </div>
                        <div className='tracks'>
                            <h2>Tracks</h2>
                            { trackList() }
                        </div>
                    </div>
                </div>
            )}

            { !loaded && (
                <p>no search results</p>
            )}
            
        </div>
    )
}

export default Search;

