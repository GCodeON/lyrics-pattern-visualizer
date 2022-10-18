const Musixmatch     = require('../utils/MusixmatchAPI');
const fetch      = require('node-fetch');
const { musixmatch } = require('.');

exports.search = (req, res, next) => {
    Musixmatch.api(`/q_track_artist=${req.query.q}`)
    .then((data) => {
        console.log('response', data);
        res.status(200).json(data); 
    }).catch(error => {
        res.status(400).json(error); 
    })
}

exports.song = (req, res, next) => {
    Musixmatch.api(`/q_track_artist=${req.query.q}`)
    .then((data) => {
        console.log('get song lyrics', data);
        let song = data.response.song;
        // if(song.url) {
        //     Genius.getLyrics(`${song.url}?bagon=1`)
        //     .then((lyrics) => {
        //         console.log('get lyrics', lyrics);
        //         res.status(200).json(lyrics); 
        //     })
        //     .catch(error => {
        //         res.status(400).json(error); 
        //     })
        // }
    })
}