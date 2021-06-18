const express = require('express');
const router = express.Router();
const { genius } = require('../controllers/index');


router.get('/search', genius.search);
router.get('/song', genius.song);
// router.get('/currently-playing', spotify.currentlyPlaying);
// router.get('/top-artists', spotify.topArtists);
// router.get('/top-tracks', spotify.topTracks);

module.exports = router