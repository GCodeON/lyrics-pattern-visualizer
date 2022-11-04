const express = require('express');
const router = express.Router();
const { spotify } = require('../controllers/index');


router.get('/search', spotify.search);
router.get('/currently-playing', spotify.currentlyPlaying);
router.get('/top-artists', spotify.topArtists);
router.get('/top-tracks', spotify.topTracks);
router.get('/track/:id', spotify.BySongId);
router.get('/artist/:id', spotify.ByArtistId);
router.get('/artist/albums/:id', spotify.artistAlbums);

module.exports = router