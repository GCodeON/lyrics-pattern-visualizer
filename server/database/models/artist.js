const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    Name: {
        type : String
    },
    albums: {
        type : String,
    }
})

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;