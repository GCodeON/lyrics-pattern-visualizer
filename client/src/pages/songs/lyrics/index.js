import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';

import { 
    getDoc, 
    setDoc, 
    updateDoc, 
    doc
} from "firebase/firestore";

import { db } from '../../../utils/firebase-config';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { FaEdit, FaPlayCircle } from "react-icons/fa";

import RhymeScheme from '../../../components/rhymeScheme'
import './styles.scss';

const Lyrics = () => {
    const [savedSong, setSavedSong] = useState({})
    const [edit, setEdit]           = useState(false)
    const [loading, setLoading]     = useState(false)

    const { id }   = useParams();
    const location = useLocation();

    let updatedSong, songInfo = {};

    useEffect(() => {
        findorCreate(id);
    }, []);

    function toggleEdit() {
        setEdit(!edit);
    }

    function setActive(track) {
        
        let activeTrack = track;
        let cleanTrack  = activeTrack.name.replace(/&/g, 'and');
        let splitTrack  = cleanTrack.split('(');
        let trackName    = splitTrack[0];
        let trackArtist  = activeTrack.artists[0].name;
        let trackFeature = splitTrack[1] ?  splitTrack[1] : '';

        const activeSong = {
            activeTrack  : activeTrack,
            cleanTrack   : cleanTrack,
            splitTrack   : splitTrack,
            trackName    : trackName,
            trackArtist  : trackArtist,
            trackFeature : trackFeature
        }

        songInfo = {...activeSong}
        console.log('song info', songInfo);
    }

    async function findorCreate(id) {
        const findSong = doc(db, "songs", id);

        const song = await getDoc(findSong)

        const savedData = song.data();

        if(song.exists()) {
            console.log('song exists', savedData);
            setSavedSong({...savedData})

        } else {
            setLoading(true);
            console.log('firebase: song not found', location.state);
            if(location.state !== null) {
                setActive(location.state.song);
                getLyrics(songInfo);
            } else {
                axios.get(`/api/spotify/track/${id}`)
                .then((res) => {
                   setActive(res.data);
                   getLyrics(songInfo);
                })
            }
        }
    }

    async function updateTrack (song) {
        const updateSong = doc(db, 'songs', song.spotify);
        
        try {
            const update = await updateDoc(updateSong, song);
            console.log('record updated on change', update);
        } catch {
            console.log('Updated unsucessful');
        }
    }

    function saveSong (spotifyID, song) {
        console.log('song data', song);
        setDoc(doc(db, 'songs', spotifyID), song)
        .then((set) => {
            console.log('song set', song,);
            setSavedSong(song)
            setLoading(false);
        })
    }

    function getLyrics (track) {
        console.log('lyrics triggered');
        axios.get(`/api/musixmatch/track-lyrics?track=${track.trackName}&artist=${track.trackArtist}`)
        .then((res) => {

            let lyrics = res.data.message.body.lyrics;
            console.log('lryics found', lyrics);

            if(lyrics) {

                let songData = {
                    title   : track.trackName,
                    artist  : track.trackArtist,
                    spotify : track.activeTrack.id,
                    lyrics  : lyrics.lyrics_body
                }
                updatedSong = songData;

                saveSong(id, updatedSong)
            } else {
                return 'lyrics not found';
            }

        })
    }

    function displayLyrics() {
        let show;
        if(savedSong.lyrics) {
            show = <div className="track">
                        <div className="editor-wrapper">  
                            <div className="info">
                                <h2 className="artist">
                                    { savedSong.artist }
                                </h2>
                                <h1 className="title">
                                    { savedSong.title }
                                </h1>       
                                <FaPlayCircle className="play" onClick={() => togglePlay() }/>
                                <FaEdit className="edit" onClick={() => toggleEdit() }/>
                            </div>

                            { !edit  && (
                                <div className="lyrics" 
                                    dangerouslySetInnerHTML={
                                        { __html: savedSong.lyrics.replace(/\n/g, '<br />') }
                                    } 
                                /> 
                            )}

                            { edit && (
                                <SunEditor
                                    onChange    = { handleChange }
                                    setContents = { savedSong.lyrics.replace(/\n/g, '<br />') }
                                    setOptions  = {{
                                        height     : 200,
                                        buttonList : [['hiliteColor', 'fontColor']]
                                    }} />
                            )}
                        </div>
                        {/* <div className="analysis-type">
                            <RhymeScheme />
                        </div> */}
                        <div className="analysis-options"></div>
                    </div>
        }
        return show;
    }

    function handleChange(updatedContent) {
        console.log('handle update', updatedContent );
        savedSong.lyrics = updatedContent;

        updateTrack(savedSong);
    }


    function togglePlay() {

        let play = { 
            song  : savedSong,
            token : localStorage.getItem('spotify_token')
        }
        console.log('player play by song id',
     );
        axios.post(`/api/spotify/play`, play)
        .then((res) => {
            console.log('song playing');
        })
    }
    
    return (
        <div className="lyrics">
            { loading ?  <div className="page">loading data</div> : displayLyrics()  }
        </div>
    );
}

export default Lyrics;
