import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaMusic } from "react-icons/fa";
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
                <div class="nav-title">
                    <p>Navigate</p>
                </div>
                <div class="search">
                    <input value={this.state.searchQuery} onChange={this.changeHandler}></input>
                    <button onClick={this.searchHandler}>Search</button>
                </div>
                <nav class="links">
                    <li>
                        <FaHome/>
                         <Link to="/">Home</Link>
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