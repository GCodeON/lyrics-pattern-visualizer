import React from "react";
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            artists: null
        }
    }

    classes=`${this.props.className ? this.props.className : ''}`;

    componentDidMount() {
        axios.get(`/api/spotify/top`)
        .then((res) => {
            this.setState({
                artists : res.data.items

            })
            console.log('saved artists to state', this.state.artists);
        })
    }

    render() {
        if (this.state.artists) {
            return (<div className="top-artists"> {
                this.state.artists.map((artist, index) => (
                    <div className="artist" key={index}>
                        <img src={artist.images[2].url} alt={artist.name}/>
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

export default Home;