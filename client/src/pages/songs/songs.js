import React from "react";
import axios from 'axios';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import './songs.scss';

import RhymeScheme from '../../components/rhymeScheme'

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleInput = this.handleInput.bind(this)
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

    handleChange(content) {
        console.log('editor changed', content)
    }

    handleInput(content) {
        console.log('input changed', content)
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
                                onChange={ this.handleChange }
                                setContents={ this.state.lyrics.replace(/\n/g, '<br>')}
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
                { this.state.lyrics ? this.showLyrics() : this.trackList()}
            </div>
        )
    }
}

export default Songs;