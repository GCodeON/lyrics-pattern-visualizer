const songModel = require('../database/models/songs')

exports.all = async (req, res, next) => {
    console.log('songs api req', req.body);
    const songs = await songModel.find({})
    try {
        console.log('all song records', songs);
        res.status(200).json(songs); 
    } catch(error) {
        res.status(400).json(error); 
    }
}

exports.add = async (req, res, next) => {

    const song = new songModel({
        title  : req.body.title ?  req.body.title   : 'test title',
        artist : req.body.artist ?  req.body.artist : 'test artist',
        lyrics : req.body.lyrics ?  req.body.lyrics : 'lyrics',
    })
    try {
        await song.save();
        console.log('songs post successful', song);
        res.status(200).json(song); 
    } catch(error) {
        res.status(400).json(error); 
    }
}