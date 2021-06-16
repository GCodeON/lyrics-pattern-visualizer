const querystring = require('querystring');
const fetch = require('node-fetch');

const basic = Buffer.from(`${process.env.GENIUS_CLIENT_ID}:${process.env.GENIUS_CLIENT_SECRET}`).toString('base64');
const API = 'https://api.genius.com';
const TOKEN_ENDPOINT = `https://api.genius.com/oauth/token`;

// const getAccessToken = async () => {
//   const response = await fetch(TOKEN_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       Authorization: `Basic ${basic}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: querystring.stringify({
//       grant_type: 'refresh_token',
//       refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
//     }),
//   });

//   return response.json();
// };

const connect = async (endpoint) => {
  // const { access_token } = await getAccessToken();

  return fetch(`${API}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_CLIENT_ACCESS_TOKEN}`,
    },
  });
};

exports.api = async (endpoint)  => {
  const response = await connect(endpoint);
  return response.json();
}
