const Genius = require('../utils/GeniusAPI');


exports.search = (req, res, next) => {
    Genius.api(`/search?q=${req.query.q}`)
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
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
