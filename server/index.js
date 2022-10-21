const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({limit: '50mb'}));

const db = require("./database/mongodb");

const routes = require('./routes/index');

app.use('/api/spotify', routes.spotify);
app.use('/api/genius', routes.genius);
app.use('/api/musixmatch', routes.musixmatch);

app.listen(PORT, () => {
    db.connectToServer((err) => {
        if (err) console.error(err);
    });
    console.log(`The Server is running at: http://localhost:${PORT}/`);
});

module.exports = app;