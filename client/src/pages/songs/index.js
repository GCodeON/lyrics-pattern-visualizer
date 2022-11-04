import { Link } from 'react-router-dom';
import React from "react";
import axios from 'axios';

import { db } from '../../utils/firebase-config';

import { 
    collection, 
    getDocs
} from  "firebase/firestore";

import './styles.scss';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks      : null,
            loading     : false
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
    
    getSongs = async () => {
        const songCollection = collection(db, "songs");
        const data = await getDocs(songCollection)
        console.log('firebase get docs', data.docs);
    }

    trackList() {
        let list;
        if (this.state.tracks) {
            list = 
            <div className="tracks"> 
                {
                    this.state.tracks.map((track, index) => (
                        <Link 
                            key={index}
                            className="link"
                            to={`/songs/${track.id}`} 
                            state={{ song: track }} 
                            >
                            <p 
                                className="track-name" 
                                >
                                {track.name}
                            </p>
                        </Link>
                    ))
                }
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