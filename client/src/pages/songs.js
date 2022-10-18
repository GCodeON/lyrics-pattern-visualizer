import React from "react";
import axios from 'axios';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import './songs.scss';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks : null,
            lyrics : null,
            loading: false
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

        let spotifyTrack = track;
        let trackName = spotifyTrack.name.replace(/&/g, 'and');

        console.log('on click track name', spotifyTrack, trackName)

        axios.get(`/api/musixmatch/track-lyrics?q=${trackName}`)
        .then((res) => {
            
            this.setState({ loading : true });

            console.log('musixmatch search', res);
            let lyrics = res.data.message.body.lyrics

            if(lyrics) {
                this.setState({
                    lyrics : lyrics.lyrics_body,
                    loading: false
                })
            }

        })


        // Genius API
        // axios.get(`/api/genius/search?q=${track}`)
        // .then((res) => {
            
        //     this.setState({ loading : true });

        //     axios.get(`/api/genius/song?id=${res.data.response.hits[0].result.id}`)
        //     .then((res) => {
        //         console.log("get lyrics", res);
        //         this.setState({
        //             lyrics : res.data,
        //             loading: false
        //         })

        //     })
        // })
    }

    trackList() {
        let list;
        if (this.state.tracks) {
            list = 
            <div className="tracks"> {
                this.state.tracks.map((track, index) => (
                    <p key={index} onClick={() => this.getLyrics(track)}>{track.name}</p>
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
            show = <div>
                        <div dangerouslySetInnerHTML={{ __html: this.state.lyrics.replace(/\n/g, '<br />') }} /> 
                    </div>
        }
        return show;
    }



    render() {

        return(
            <div>
                   
                { this.state.lyrics ? this.showLyrics() : this.trackList()}
                {/* <SunEditor
                    setOptions={{
                        height: 200,
                        defaultValue: 'test string',
                        buttonList: [['hiliteColor', 'fontColor']] 
                    }} /> */}
            </div>
        )
    }
}

export default Songs;