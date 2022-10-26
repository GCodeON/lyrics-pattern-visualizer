import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Object,
    },
    lyrics: {
        type: String
    }
})

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;