const express = require('express');
const router = express.Router();
const { songs } = require('../controllers/index');


router.get('/', songs.all);
router.post('/', songs.add);
 
module.exports = router