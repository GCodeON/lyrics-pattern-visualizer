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

exports.update = async (req, res, next) => {
    console.log("song id", req)
    let id = req.params.id ? req.params.id : '63594cda7fa0722368b4227e';

    let updateSong = {
        title: req.body.title ? req.body.title : 'postman',
        artist: req.body.artist ?  req.body.artist : 'postman',
        lyrics: req.body.lyrics ?  req.body.lyrics : 'postman'
    }
    console.log('updated song', updateSong);
    try {
        await songModel.findByIdAndUpdate(id, updateSong);
        console.log('existing song found', song);
        await songModel.save(updateSong);
        console.log('song saved sucessfully', song);

        res.status(200).json(song); 
    } catch (error) {
        console.log
        res.status(500).send(error);
    }
}