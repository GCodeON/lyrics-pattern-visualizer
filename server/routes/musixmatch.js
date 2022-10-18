const express = require('express');
const router = express.Router();
const { musixmatch } = require('../controllers/index');

router.get('/search', musixmatch.tracks_lyrics);

module.exports = router