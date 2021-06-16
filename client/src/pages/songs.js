import React from "react";
import axios from 'axios';

import './artists.scss';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks : null
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

    render() {
        if (this.state.tracks) {
            return (<div className="user-top-track"> {
                this.state.tracks.map((track, index) => (
                    // <div className="track" key={index} style={{ backgroundImage:`url(${artist.images[0].url ? artist.images[0].url : ''})` }}>
                    //     {/* <h3>{artist.name}</h3> */}
                    // </div>
                    <p key={index}>{track.name}</p>
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