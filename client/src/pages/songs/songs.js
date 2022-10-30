import React from "react";
import axios from 'axios';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import { db } from '../../utils/firebase-config';

import { collection, getDocs, addDoc, updateDoc } from  "firebase/firestore";

import RhymeScheme from '../../components/rhymeScheme'
import './songs.scss';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            tracks      : null,
            lyrics      : null,
            activeTrack : null,
            splitTrack  : null,
            trackName   : null,
            trackArtist : null,
            loading     : false,
        }
    }

    classes=`${this.props.className ? this.props.className : ''}`;
    componentDidMount() {

        this.getSongs();
        
        // console.log('firebase', firebase);
        axios.get(`/api/spotify/top-tracks`)
        .then((res) => {
            this.setState({ tracks : res.data.items })
            console.log('users top tracks', this.state.tracks);
        })
    }

    getSongs = async () => {
        const songCollection = collection(db, "songs");
        console.log('firebase', db);
        const data = await getDocs(songCollection)
        console.log('firebase get docs', data.docs);
    }

    addNew = async (song) => {
        const songCollection = collection(db, "songs");
        console.log('firebase', db);

        const songAdded = await addDoc(songCollection, song);

        console.log('firebase add', songAdded);
        
      
        // axios.post(`/api/songs/`, song)
        // .then((res) => {
        //     console.log('song annotations saved', res);
        // })   
    }

    showExisting(song) { 
        console.log('show existing track updated', song);

    }

    findorCreate(track) {
        axios.get(`/api/songs/${this.state.activeTrack.id}`)
        .then(res => {
            console.log('find response', res);
            if(res.data === 'track does not exist yet') {
                this.addNew();
            } else {
                this.showExisting(res.data);
            }
        })
    }

    getLyrics = (track) => {

        let activeTrack = track;
        let cleanTrack  = activeTrack.name.replace(/&/g, 'and');
        let splitTrack  = cleanTrack.split('(');
        let trackName = splitTrack[0];
        let trackArtist = activeTrack.artists[0].name;
        let trackFeature = splitTrack[1] ?  splitTrack[1] : '';

        this.setState({
            activeTrack  : activeTrack,
            cleanTrack   : cleanTrack,
            splitTrack   : splitTrack,
            trackName    : trackName,
            trackArtist  : trackArtist,
            trackFeature : trackFeature,
        })

        // console.log('on click track name', activeTrack);
        axios.get(`/api/songs/${activeTrack.id}`)
        .then(res => {
            if(res) {
                if(res.data === 'track does not exist yet') {

               

                    axios.get(`/api/musixmatch/track-lyrics?track=${trackName}&artist=${trackArtist}`)
                    .then((res) => {
                        
                        this.setState({ loading : true });
                        // console.log('musixmatch search', res);
            
                        let lyrics = res.data.message.body.lyrics;
            
                        if(lyrics) {
                            this.setState({
                                lyrics       : lyrics.lyrics_body,
                                loading      : false
                            })

                            let songData = {
                                title   : this.state.trackName,
                                artist  : this.state.trackArtist,
                                spotify : this.state.activeTrack.id,
                                lyrics  : this.state.lyrics
                            }
                    

                            this.addNew(songData);
                        } 
            
                    })
                    
                } else {
                    // console.log('song already exists', res.data);
                    this.setState({
                        lyrics  : res.data.lyrics,
                        loading : false
                    })
                }
            }
        })
    }

    trackList() {
        let list;
        if (this.state.tracks) {
            list = 
            <div className="tracks"> {
                this.state.tracks.map((track, index) => (
                    <p className="track-name" key={index} onClick={() => this.getLyrics(track)}>{track.name}</p>
                ))}
            </div>
        }
        else {
            list = <div>loading data</div>
        }
        return list;
    }

    handleChange(content) {
        // console.log('editor changed', content)

        let songData = {
            title   : this.state.trackName,
            artist  : this.state.trackArtist,
            spotify : this.state.activeTrack.id,
            lyrics  : content
        }

        // console.log('spotifyID', this.state.activeTrack.id );
        axios.get(`/api/songs/${this.state.activeTrack.id}`)
        .then(res => {
            // console.log('find response', res);
            if(res) {
                if(res.data === 'track does not exist yet') {

                    this.addNew(songData);

                    // console.log('add new song', res);
                    axios.post(`/api/songs/`, songData)
                    .then((res) => {
                        // console.log('song annotations saved', res);
                    })   
                    
                } else {
                    let existingSong = res.data;
                    // console.log('existing track updated', content);
                    existingSong.lyrics = content;
                    // console.log('lyrics updted', existingSong.lyrics);
                    axios.post(`/api/songs/${this.state.activeTrack.id}`, existingSong)
                    .then((res) => {
                        // console.log('song annotations updated', res);
                        this.setState({
                            lyrics       :  res.data.lyrics,
                            loading      : false
                        })
                    }) 
                }
            }

        })

       
    }

    displayLyrics() {
        let show;
        if(this.state.lyrics) {
            show = <div className="track">
                        <div className="editor-wrapper">  
                            {/* <div dangerouslySetInnerHTML={{ __html: this.state.lyrics.replace(/\n/g, '<br />') }} />  */}
                            <div className="info">
                                <h1 className="title">{ this.state.trackName }</h1>
                                <h3 className="artist">{ this.state.trackArtist }</h3>
                            </div>
                            <SunEditor
                                onChange={ this.handleChange }
                                setContents={ this.state.lyrics.replace(/\n/g, '<br />')}
                                setOptions={{
                                    height: 200,
                                    buttonList: [['hiliteColor', 'fontColor']] 
                                }} />
                        </div>
                        <div className="analysis-type">
                            <RhymeScheme />
                        </div>
                        <div className="analysis-options"></div>
                    </div>
        }
        return show;
    }



    render() {

        return(
            <div className="songs">
                { this.state.lyrics ? this.displayLyrics() : this.trackList()}
            </div>
        )
    }
}

export default Songs;