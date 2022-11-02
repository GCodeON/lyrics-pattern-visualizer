import { Link } from 'react-router-dom';
import React from "react";
import axios from 'axios';

import { db } from '../../utils/firebase-config';

import { 
    collection, 
    getDocs
} from  "firebase/firestore";

import './songs.scss';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks      : null,
            getLyrics   : null,
            savedLyrics : null,
            lyrics      : null,
            content     : null,
            activeTrack : null,
            splitTrack  : null,
            trackName   : null,
            trackArtist : null,
            loading     : false,
            edit        : true
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

    getSongs = async () => {
        const songCollection = collection(db, "songs");
        const data = await getDocs(songCollection)
        console.log('firebase get docs', data.docs);
    }

    getLyrics = (track) => {

        this.setActive(track);
        
        axios.get(`/api/musixmatch/track-lyrics?track=${this.state.trackName}&artist=${this.state.trackArtist}`)
        .then((res) => {
            
            this.setState({ loading : true });

            let lyrics = res.data.message.body.lyrics;

            if(lyrics) {
                this.setState({
                    getLyrics : lyrics.lyrics_body,
                    loading   : false
                })

                let songData = {
                    title   : this.state.trackName,
                    artist  : this.state.trackArtist,
                    spotify : this.state.activeTrack.id,
                    lyrics  : this.state.getlyrics
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

                    <Link 
                        className="link"
                        to={`/songs/${track.id}`} 
                        state={{ data: track }} 
                        >
                    <p 
                        className="track-name" 
                        key={index}
                        >
                        {track.name}
                    </p>
                </Link>


                ))}
            </div>
        }
        else {
            list = <div>loading data</div>
        }
        return list;
    }

    render() {
        return(
            <div className="songs">
                { this.trackList() }
            </div>
        )
    }
}

export default Songs;