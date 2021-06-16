import React from "react";
import axios from 'axios';

import './artists.scss';

class Artists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            artists : null
        }
    }

    classes=`${this.props.className ? this.props.className : ''}`;

    componentDidMount() {
        axios.get(`/api/spotify/top-artists`)
        .then((res) => {
            this.setState({
                artists : res.data.items

            })
            console.log('saved artists to state', this.state.artists);
        })
    }

    render() {
        if (this.state.artists) {
            return (<div className="user-top-artists"> {
                this.state.artists.map((artist, index) => (
                    <div className="artist" key={index} style={{ backgroundImage:`url(${artist.images[0].url})` }}>
                        <h3>{artist.name}</h3>
                    </div>
                ))
            }
            </div>)
        }
        else {
            return <div>loading data</div>
        }
    }
}

export default Artists;