const fetch = require('node-fetch');

const musixmatch_BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
const musixmatch_API_KEY  = `&apikey=${process.env.MUSIXMATCH_API_KEY}`;

const connect = async (endpoint) => {
  console.log('test backend', endpoint);
  let musixmatch_API_URL = `${musixmatch_BASE_URL}${endpoint}${musixmatch_API_KEY}`
  return fetch(musixmatch_API_URL);
};

exports.api = async (endpoint)  => {
  const response = await connect(endpoint);
  return response.json();
}
