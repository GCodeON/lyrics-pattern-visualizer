const songModel = require('../database/models/song')

exports.all = async (req, res, next) => {

    const songs = await songModel.find({})
    try {
        console.log('all song records', songs);
        res.status(200).json(songs); 
    } catch(error) {
        res.status(400).json(error); 
    }
}

exports.find = async (req, res, next) => {

    console.log('check if spotify id exists', req.params.id);

    try {

        await songModel.findOne({ spotify: req.params.id})
        .then(song => {
            console.log('song found', song)
            if(song) {
                res.status(200).json(song);
            } else {
                res.status(200).json('track does not exist yet');
            }
        }) 
    } catch(error) {
        res.status(400).json(error); 
    }
}

exports.add = async (req, res, next) => {

    const song = new songModel(req.body);

    try {
        await song.save();
        console.log('songs post successful', song);
        res.status(200).json(song); 
    } catch(error) {
        res.status(400).json(error); 
    }
}

exports.update = async (req, res, next) => {
    console.log("song id", req.params.id);

    let songId =  req.params.id;

    let updateSong = {
        title     : req.body.title,
        artist    : req.body.artist,
        lyrics    : req.body.lyrics
    }
    
    try {

        let song = await songModel.findOne({ spotify: songId})
        console.log('song found sucessfully', song);

        song.save(updateSong)
        console.log('song updated sucessfully', song);
        
        res.status(200).json(song); 
    } catch (error) {

        res.status(500).send(error);
    }
}