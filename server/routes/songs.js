const express = require('express');
const router = express.Router();
const { songs } = require('../controllers/index');


router.get('/', songs.all);

module.exports = router