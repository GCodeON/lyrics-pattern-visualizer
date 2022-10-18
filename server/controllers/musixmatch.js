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

exports.trackLyrics = (req, res, next) => {
    Musixmatch.api(`track.search? q_track=${req.query.q}`)
    .then((data) => {
        console.log('get song lyrics', data);
        let track = data.body;
        if(track.id) {
            Musixmatch.api(`track.lyrics.get?track_id=${track_id}`)
            .then((lyrics) => {
                console.log('get lyrics', lyrics);
                res.status(200).json(lyrics); 
            })
            .catch(error => {
                res.status(400).json(error); 
            })
        }
    })
}