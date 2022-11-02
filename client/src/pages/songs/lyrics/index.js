import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { 
    collection, 
    getDocs, 
    getDoc, 
    setDoc, 
    updateDoc, 
    doc
} from  "firebase/firestore";

import { db } from '../../../utils/firebase-config';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { FaEdit } from "react-icons/fa";

import RhymeScheme from '../../../components/rhymeScheme'
import './styles.scss';

const Lyrics = () => {

    const [savedSong, setSavedSong] = useState({})
    const [edit, setEdit] = useState(false)
    const [lyrics, setLyrics] = useState(true)

    const { id }              = useParams();
    const location            = useLocation();

    useEffect(() => {
        findorCreate(id);
    }, []);

    async function findorCreate(id) {
        const findSong = doc(db, "songs", id);

        const song = await getDoc(findSong)

        const savedData = song.data();

        if(song.exists()) {
            console.log('song exists', savedData);
            setSavedSong(savedData)

        } else {
            console.log('firebase: song not found');
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
    async function setSong (spotifyID, song) {
        setDoc(doc(db, 'songs', spotifyID), song)
        .then((song) => {
            console.log('song set', song);
        })
    }
    function toggleEdit() {
        setEdit(!edit);
    }

    function displayLyrics() {
        let show;
        if(savedSong.lyrics) {
            show = <div className="track">
                        <div className="editor-wrapper">  
                            <div className="info">
                                <h1 className="title">
                                    { savedSong.title }
                                </h1>
                                <h3 className="artist">
                                    { savedSong.artist }
                                </h3>
                                <button onClick={() => toggleEdit() }>  <FaEdit/></button>
                            </div>

                            { !edit  && (
                                <div className="lyrics" 
                                    dangerouslySetInnerHTML={
                                        { __html: savedSong.lyrics.replace(/\n/g, '<br />') }
                                    } 
                                /> 
                            )}

                            { edit  && (
                                <SunEditor
                                    onChange    = { handleChange }
                                    setContents = { savedSong.lyrics.replace(/\n/g, '<br />')}
                                    setOptions  = {{
                                        height     : 200,
                                        buttonList : [['hiliteColor', 'fontColor']]
                                    }} />
                            )}
                        </div>
                        <div className="analysis-type">
                            <RhymeScheme />
                        </div>
                        <div className="analysis-options"></div>
                    </div>
        }
        return show;
    }

    function loading() {
        return  <div>loading data</div>;
    }
    function handleChange(updatedContent) {
        console.log('handle update', updatedContent );
        savedSong.lyrics = updatedContent;

        updateTrack(savedSong);
    }
    return (
        <div className="songs">
            { savedSong ? displayLyrics() : loading() }
        </div>
    );
}

export default Lyrics;
