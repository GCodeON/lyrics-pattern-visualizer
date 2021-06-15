const express = require('express');
const router = express.Router();
const { spotify } = require('../controllers/index');


router.get('/search', spotify.search);
router.get('/currently-playing', spotify.currentlyPlaying);
router.get('/top', spotify.usersTop);
module.exports = router