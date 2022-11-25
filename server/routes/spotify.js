const express     = require('express');
const router      = express.Router();
const { spotify } = require('../controllers/index');


router.get('/login', spotify.login);

router.get('/search', spotify.search);
router.get('/search-artist', spotify.searchArtist);
router.get('/player', spotify.playerState);
router.get('/currently-playing', spotify.currentlyPlaying);
router.get('/recently-played', spotify.recentlyPlayed);
router.get('/top-artists', spotify.topArtists);
router.get('/top-tracks', spotify.topTracks);
router.get('/track/:id', spotify.BySongId);
router.get('/artist/:id', spotify.ByArtistId);
router.get('/artist/albums/:id', spotify.artistAlbums);
router.get('/albums/:id', spotify.Album);

module.exports = router