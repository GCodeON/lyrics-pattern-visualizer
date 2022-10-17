const querystring = require('querystring');
const fetch = require('node-fetch');

const musixmatch_API_URL = 'https://api.musixmatch.com/ws/1.1/';
const musixmatch_API_KEY = `&${process.env.MUSIXMATCH_API_KEY}`;

const connect = async (endpoint) => {
  return fetch(`${musixmatch_API_URL}${endpoint}}${musixmatch_API_KEY}`);
};

exports.api = async (endpoint)  => {
  const response = await connect(endpoint);
  return response.json();
}
