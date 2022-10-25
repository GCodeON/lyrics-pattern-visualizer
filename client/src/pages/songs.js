import React from "react";
import axios from 'axios';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import './songs.scss';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks      : null,
            lyrics      : null,
            activeTrack : null,
            splitTrack  : null,
            trackName   : null,
            trackArtist : null,
            loading     : false
        }
    }

    classes=`${this.props.className ? this.props.className : ''}`;

    componentDidMount() {
        axios.get(`/api/spotify/top-tracks`)
        .then((res) => {
            this.setState({ tracks : res.data.items })
            console.log('users top tracks', this.state.tracks);
        })
    }

    getLyrics = (track) => {

        let activeTrack = track;
        let cleanTrack  = activeTrack.name.replace(/&/g, 'and');
        let splitTrack  = cleanTrack.split('(');
        let trackName = splitTrack[0];
        let trackArtist = activeTrack.artists[0].name;
        let trackFeature = splitTrack[1] ?  splitTrack[1] : '';

        console.log('on click track name', activeTrack);

        axios.get(`/api/musixmatch/track-lyrics?track=${trackName}&artist=${trackArtist}`)
        .then((res) => {
            
            this.setState({ loading : true });
            console.log('musixmatch search', res);

            let lyrics = res.data.message.body.lyrics;

            if(lyrics) {
                this.setState({
                    lyrics       : lyrics.lyrics_body,
                    activeTrack  : activeTrack,
                    cleanTrack   : cleanTrack,
                    splitTrack   : splitTrack,
                    trackName    : trackName,
                    trackArtist  : trackArtist,
                    trackFeature : trackFeature,
                    loading      : false
                })
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

    showLyrics() {
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
                                setContents={ this.state.lyrics.replace(/\n/g, '<br>')}
                                setOptions={{
                                    height: 200,
                                    defaultValue: 'test string',
                                    buttonList: [['hiliteColor', 'fontColor']] 
                                }} />
                        </div>
                        <div className="analysis-type">
                            <h2>Rhyme Scheme</h2>

                            <div className="complexity">
                                <h2>9.7</h2>
                                <h4>Complexity</h4>
                            </div>
                            
                            <div className="unique">
                                <h2>56</h2>
                                <h4>Unique Rhymes</h4>
                            </div>

                            <div className="averages">
                                <div className="rhyme">
                                    <h2>3</h2>
                                    <h4>Syllables per Rhyme</h4>
                                </div>
                                <div className="bar">
                                    <h2>9</h2>
                                    <h4>Syllables per Bar</h4>
                                </div>
                                <div className="bar">
                                    <h2>6</h2>
                                    <h4>Rhymes per Bar</h4>
                                </div>
                            </div>
                        </div>
                        <div className="analysis-options"></div>
                    </div>
        }
        return show;
    }



    render() {

        return(
            <div className="songs">
                { this.state.lyrics ? this.showLyrics() : this.trackList()}
            </div>
        )
    }
}

export default Songs;