const express        = require('express');
const router         = express.Router();
const { musixmatch } = require('../controllers/index');

router.get('/search', musixmatch.search);
router.get('/track-lyrics', musixmatch.trackLyrics);

module.exports = router;