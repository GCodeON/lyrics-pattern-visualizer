const mongoose = require("mongoose");

const databaseURI = process.env.MONGODB_URI;

module.exports = {
  connectToServer: (callback) => {
    mongoose.connect(databaseURI, {
      useNewUrlParser    : true,
      useUnifiedTopology : true
    })
    .then(() =>  {
      console.log('MongoDB Connection Sucessful')
      callback()
    })
    .catch((error) =>  {
      console.log('error', error);
    })
  }
};