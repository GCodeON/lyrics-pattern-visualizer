import React from "react";
import axios from 'axios';

import './artists.scss';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks : null,
            searchResults: null
        }
    }

    classes=`${this.props.className ? this.props.className : ''}`;

    componentDidMount() {
        axios.get(`/api/spotify/top-tracks`)
        .then((res) => {
            this.setState({
                tracks : res.data.items

            })
            console.log('users top tracks', this.state.tracks);
        })
    }

    getLyrics = (track) => {
        console.log('on click track name', track);
        axios.get(`/api/genius/search?q=${track}`)
        .then((res) => {

            console.log('search lyrics', res);
            
            axios.get(`/api/genius/song?id=${res.data.response.hits[0].result.id}`)
            .then((res) => {
                console.log("get lyrics", res.data);
            })
        })
    }


    render() {
        if (this.state.tracks) {
            return (<div className="user-top-track"> {
                this.state.tracks.map((track, index) => (
                    // <div className="track" key={index} style={{ backgroundImage:`url(${artist.images[0].url ? artist.images[0].url : ''})` }}>
                    //     {/* <h3>{artist.name}</h3> */}
                    // </div>
                    <p key={index} onClick={() => this.getLyrics(track.name)}>{track.name}</p>
                ))
            }
            </div>)
        }
        else {
            return <div>loading data</div>
        }
    }
}

export default Songs;