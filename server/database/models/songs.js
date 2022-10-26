const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
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