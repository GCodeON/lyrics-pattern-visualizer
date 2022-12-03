const Spotify = require('../utils/SpotifyAPI');
const Utils = require('../utils/');

exports.login = (req, res, next) => {
    Spotify.login()
    .then((data) => {
        console.log('status', data)
        res.status(200).json(data); 
    })
}

exports.play = (req, res, next) => {
    console.log('api play post', req.body);
    Spotify.api(`/me/player/play`, req.body.play.token)
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.search = (req, res, next) => {
    Spotify.api(`/search?q=${req.query.q}&type=artist,album,track`)
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.searchArtist = (req, res, next) => {
    Spotify.api(`/search?q=${req.query.q}&type=artist`)
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.playerState = (req, res, next) => {
    console.log('api play post', req.body);
    Spotify.api(`/me/player`)
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.topArtists = (req, res, next) => {
    Spotify.api(`/me/top/artists`)
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.topTracks = (req, res, next) => {
    Spotify.api(`/me/top/tracks`)
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.currentlyPlaying = (req, res, next) => {
    Spotify.api('/me/player/currently-playing')
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.recentlyPlayed = (req, res, next) => {
    Spotify.api('/me/player/recently-played')
    .then((data) => {
        res.status(200).json(data); 
    })
}

exports.BySongId = (req, res, next) => {
    Spotify.api(`/tracks/${req.params.id}`)
    .then((data) => {
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
        let uniqueAlbums = Utils.getUniqueListBy(data.items, 'name');
        let onlyAlbums = uniqueAlbums.filter(item => {
            return item.album_type == "album";
        })
        res.status(200).json(onlyAlbums);
    })
}

exports.Album = (req, res, next) => {
    Spotify.api(`/albums/${req.params.id}`)
    .then((data) => {
        res.status(200).json(data); 
    })
}