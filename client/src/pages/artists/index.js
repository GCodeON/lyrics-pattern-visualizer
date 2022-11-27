import { Link } from 'react-router-dom';
import React from "react";
import axios from 'axios';

import './styles.scss';

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

                    <Link 
                        key={index}
                        className="link"
                        to={`/artist/${artist.id}`} 
                        state={{ artist: artist }} 
                        >
                        <div className="artist" key={index} style={{ backgroundImage:`url(${artist.images[0].url})` }}>
                            <h3>{artist.name}</h3>
                        </div>
                    </Link>
                ))
            }
            </div>)
        }
        else {
            return <div class="page">loading data</div>
        }
    }
}

export default Artists;