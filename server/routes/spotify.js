const express = require('express');
const router = express.Router();
const { spotify } = require('../controllers/index');


router.get('/search', spotify.search);
router.get('/currently-playing', spotify.currentlyPlaying);

module.exports = router