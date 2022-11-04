const Spotify = require('../utils/SpotifyAPI');


exports.search = (req, res, next) => {
    Spotify.api(`/search?q=${req.query.q}&type=artist`)
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
    })
}

exports.topArtists = (req, res, next) => {
    Spotify.api(`/me/top/artists`)
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
    })
}
exports.topTracks = (req, res, next) => {
    Spotify.api(`/me/top/tracks`)
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

exports.BySongId = (req, res, next) => {

    Spotify.api(`/tracks/${req.params.id}`)
    .then((data) => {
        // console.log('response', data);
        res.status(200).json(data); 
    })
}

exports.ByArtistId = (req, res, next) => {

    Spotify.api(`/artists/${req.params.id}`)
    .then((data) => {
        console.log('response', data);
        res.status(200).json(data); 

    })
}


exports.artistAlbums = (req, res, next) => {

    Spotify.api(`/artists/${req.params.id}/albums`)
    .then((data) => {
        console.log('albums', data);

        function getUniqueListBy(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }

        let uniqueAlbums = getUniqueListBy(data.items, 'name');
        console.log('unique', uniqueAlbums)
        res.status(200).json(uniqueAlbums); 
        
    })
}
