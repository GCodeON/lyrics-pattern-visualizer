import React from "react";
import axios from 'axios';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import { db } from '../../utils/firebase-config';

import { 
    collection, 
    getDocs, 
    getDoc, 
    setDoc, 
    updateDoc, 
    doc
} from  "firebase/firestore";

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
        
        axios.get(`/api/spotify/top-tracks`)
        .then((res) => {
            this.setState({ tracks : res.data.items })
            console.log('users top tracks', this.state.tracks);
        })
    }

    getSongs = async () => {
        const songCollection = collection(db, "songs");
        const data = await getDocs(songCollection)
        console.log('firebase get docs', data.docs);
    }

    setSong = async (spotifyID, song) => {
        const songSet = await setDoc(doc(db, 'songs', spotifyID), song);

        console.log('set custom', songSet);
    }

    updateTrack = async (song) => {
        const updateSong = doc(db, 'songs', song.spotify);

        const updatedSong = await updateDoc(updateSong, song);

        console.log('updatedSong', updateSong)

    }

    showExisting(song) { 
        console.log('show existing track updated', song);

    }

    findorCreate = async (track, data, type) => {
        console.log(data.spotify);

        const findSong = doc(db, "songs", data.spotify);

        const song = await getDoc(findSong)

        console.log('firebase get', song.data());

       const savedSong = song.data();


        if(song.exists()) {
            console.log('firebase: song found', song.data());

            if(type === 'get') {
                this.setState({
                    lyrics : savedSong.lyrics
                })
            } else {
                this.updateTrack(data)   
            } 

        } else {
            console.log('firebase: song not found');
            this.setSong(track.id, data);
        }
        
    }

    setActive(track) {
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
    }

    getLyrics = (track) => {

        this.setActive(track);
        
        axios.get(`/api/musixmatch/track-lyrics?track=${this.state.trackName}&artist=${this.state.trackArtist}`)
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
        
                this.findorCreate(track, songData, 'get');

            } else {
                return 'lyrics not found';
            }

        })
    }

    trackList() {
        let list;
        if (this.state.tracks) {
            list = 
            <div className="tracks"> {
                this.state.tracks.map((track, index) => (
                    <p className="track-name" 
                        key={index} 
                        onClick={() => this.getLyrics(track)}
                        >
                        {track.name}
                    </p>
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

        this.findorCreate(this.state.activeTrack, songData, 'change');
        
       
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