const querystring = require('querystring');
const fetch = require('node-fetch');

const basic          = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
const spotifyAPI     = 'https://api.spotify.com/v1';
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method  : 'POST',
    headers : {
      Authorization  : `Basic ${basic}`,
      'Content-Type' : 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type    : 'refresh_token',
      refresh_token : process.env.SPOTIFY_REFRESH_TOKEN
    }),
  });

  return response.json();
};

const connect = async (endpoint, token) => {
  const { access_token } = await getAccessToken();

  return fetch(`${spotifyAPI}${endpoint}`, {
    headers: {
      Authorization : `Bearer ${ token ? token : access_token }`,
    },
  });
};

exports.api = async (endpoint, token)  => {
  const response = await connect(endpoint, token);
  return response.json();
}
