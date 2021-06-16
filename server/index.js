const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({limit: '50mb'}));


const routes = require('./routes/index');

app.use('/api/spotify', routes.spotify);
app.use('/api/genius', routes.genius);

app.listen(PORT, () => {
    console.log(`The Server is running at: http://localhost:${PORT}/`);
});

module.exports = app;