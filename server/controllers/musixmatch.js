const Musixmatch     = require('../utils/MusixmatchAPI');
const fetch      = require('node-fetch');
// const { musixmatch } = require('.');

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
    console.log("lyrics query", req.query.q);
    Musixmatch.api(`track.search?q_track=${req.query.q}`)
    .then((data) => {
        let track = data.message.body.track_list[0].track;
        console.log('searched track', track);
        if(track.has_lyrics) {
            Musixmatch.api(`track.lyrics.get?track_id=${track.track_id}`)
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