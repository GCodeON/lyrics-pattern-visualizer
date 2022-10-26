const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: {
        type : String
    },
    artist: {
        type : String,
    }
})

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;