import React from 'react';
import axios from 'axios';

import { FaHome, FaMusic, FaUserCircle, FaSearch } from "react-icons/fa";
import './sidebar.scss';


import { Link } from 'react-router-dom'

class Sidebar extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
            searchQuery: '',
            searchResults: null
        }
    }
    
    searchHandler = () => {
        axios.get(`/api/spotify/search?q=${this.state.searchQuery}`)
        .then((res) => {
            console.log("get search", res);
            this.setState({
                searchResults: res.data.artists.items[0]
            })
        })
    }
    changeHandler = (evt) => {
        this.setState({
            searchQuery: evt.target.value
        });
    }

    render(){
        return (
            <div className="sidebar">
                <div className="title">
                    <h4>DECODED</h4>
                </div>
                <div className="search">
                    <input value={this.state.searchQuery} onChange={this.changeHandler}></input>
                    <FaSearch onClick={this.searchHandler} />
                </div>
                <nav className="links">
                    <li>
                        <FaHome/>
                         <Link to="/">Home</Link>
                    </li>
                    <li>
                        <FaUserCircle />
                        <Link to="/artists">Artists</Link> 
                    </li>
                    <li>
                        <FaMusic/>
                        <Link to="/songs">Songs</Link> 
                    </li>
                </nav>
            
            </div>
        )
    }
    
}

export default Sidebar;