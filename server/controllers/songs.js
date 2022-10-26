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

