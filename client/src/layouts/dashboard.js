import { Link, Outlet, useNavigate, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Sidebar from '../ui/sidebar/sidebar';
import SpotifyWebPlayer from '../ui/spotify-player';
import './styles.scss';

import { Divide as Hamburger } from 'hamburger-react'

const Dashboard = (props) => {
  // const classes =`${props.className ? props.className : ''}`;

  const navigate = useNavigate();
  const [ activeTrack, setActiveTrack] = useState({});
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    console.log('dashboard updated track:', activeTrack);
    if (!localStorage.getItem('spotify_token')) { 
      // window.location.replace("/");
      navigate('/login');
    } 
  },[activeTrack]);


const getActive = (track) => {
  // console.log('get active track on dashboard', track);
  setActiveTrack(track);
}


  return (
    <div className="root-route">
      <div className="dashboard">
        <div className="header">
            <Link to="/">
              <h1 className="title">DECODED</h1>
            </Link>
            <Hamburger toggled={isOpen} toggle={setOpen}  />
        </div>
        { isOpen && (
          <Sidebar></Sidebar>
        )}
        <div className="container">
          <Outlet />
        </div>
      </div>
      <div className="fixed-footer">
        <SpotifyWebPlayer update={getActive} />
      </div>
    </div>
  )
}

export default Dashboard;