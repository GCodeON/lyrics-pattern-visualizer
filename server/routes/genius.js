const express    = require('express');
const router     = express.Router();
const { genius } = require('../controllers/index');

router.get('/search', genius.search);
router.get('/song', genius.song);

module.exports = router;