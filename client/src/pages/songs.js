import React from "react";
import axios from 'axios';

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
        console.log('on click track name', track)
        axios.get(`/api/genius/search?q=${track}`)
        .then((res) => {
            
            this.setState({ loading : true });

            axios.get(`/api/genius/song?id=${res.data.response.hits[0].result.id}`)
            .then((res) => {
                console.log("get lyrics", res);
                this.setState({
                    lyrics : res.data,
                    loading: false
                })

            })
        })
    }

    trackList() {
        let list;
        if (this.state.tracks) {
            list = 
            <div className="tracks"> {
                this.state.tracks.map((track, index) => (
                    <p key={index} onClick={() => this.getLyrics(track.name)}>{track.name}</p>
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
            show = <div dangerouslySetInnerHTML={{ __html: this.state.lyrics.replace(/\n/g, '<br />') }} />
        }
        return show;
    }


    render() {

        return(
            <div>
                { this.state.lyrics ? this.showLyrics() : this.trackList()}
            </div>
        )
    }
}

export default Songs;