const { MongoClient } = require("mongodb");
const database = process.env.MONGODB_URI;
const client = new MongoClient(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      // Verify we got a good "db" object
      if (db){
        _db = db.db("lyrics-visualizer");
        console.log("Successfully connected to MongoDB.", db, _db); 
      }
      return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};