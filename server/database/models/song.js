const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    spotify: {
        type : String,
    },
    title: {
        type : String
    },
    artist: {
        type : String,
    },
    lyrics: {
        type : String
    }
})

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;