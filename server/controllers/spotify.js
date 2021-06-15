const e = require('express');
const Spotify = require('../utils/SpotifyAPI');


exports.search = (req, res, next) => {
    Spotify.api(`/search?q=${req.query.q}&type=artist`)
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
    })
}

exports.usersTop = (req, res, next) => {
    Spotify.api(`/me/top/artists`)
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
    })
}


exports.currentlyPlaying = (req, res, next) => {

    Spotify.api('/me/player/currently-playing')
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
    })
}
