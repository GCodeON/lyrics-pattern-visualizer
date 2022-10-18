const querystring = require('querystring');
const fetch = require('node-fetch');

const musixmatch_BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
const musixmatch_API_KEY = `&apikey=${process.env.MUSIXMATCH_API_KEY}`;

const connect = async (endpoint) => {
  let musixmatch_API_URL = `${musixmatch_BASE_URL}${endpoint}${musixmatch_API_KEY}`
  console.log("connect", musixmatch_API_URL);
  return fetch(musixmatch_API_URL);
};

exports.api = async (endpoint)  => {
  const response = await connect(endpoint);
  console.log('musixmatch api call', response);
  return response.json();
}
