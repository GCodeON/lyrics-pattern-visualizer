const Genius = require('../utils/GeniusAPI');
const fetch = require('node-fetch');
const { genius } = require('.');

exports.search = (req, res, next) => {
    Genius.api(`/search?q=${req.query.q}`)
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
    })
}

exports.song = (req, res, next) => {
    Genius.api(`/songs/${req.query.id}`)
    .then((data) => {

        Genius.getLyrics(data.response.song.url)
        .then((lyrics) => {
            res.status(200).json(lyrics); 
        })
        .catch(error => {
            res.status(400).json(error); 
        })
    })
}


// exports.topArtists = (req, res, next) => {
//     Spotify.api(`/me/top/artists`)
//     .then((data) => {
//         // console.log('response', data);
//         res.status(200).json(data); 
//     })
// }
// exports.topTracks = (req, res, next) => {
//     Spotify.api(`/me/top/tracks`)
//     .then((data) => {
//         // console.log('response', data);
//         res.status(200).json(data); 
//     })
// }



// exports.currentlyPlaying = (req, res, next) => {

//     Spotify.api('/me/player/currently-playing')
//     .then((data) => {
//         // console.log('response', data);
//         res.status(200).json(data); 
//     })
// }
