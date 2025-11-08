const querystring = require('querystring');
const fetch = require('node-fetch');

const basic          = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

const AuthEndPoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/callback/';

const scopes = [
    "streaming",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-playback-position",
    "user-top-read",
    "user-read-private",
    "user-read-birthdate"
];

// https://accounts.spotify.com/en/authorize?response_type=token&client_id=adaaf209fb064dfab873a71817029e0d&redirect_uri=https:%2F%2Fdeveloper.spotify.com%2Fdocumentation%2Fweb-playback-sdk%2Fquick-start%2F&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&show_dialog=true

// streaming
// user-read-email
// user-read-private
// user-library-read
// user-library-modify
// user-read-playback-state
// user-modify-playback-state


const loginUri = `${AuthEndPoint}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
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
      // refresh_token : process.env.SPOTIFY_REFRESH_TOKEN
    }),
  });

  return response.json();
};

const connect = async (endpoint, token) => {
  // const { access_token } = await getAccessToken();

  return fetch(`${spotifyAPI}${endpoint}`, {
    headers: {
      Authorization : `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
    },
  });
};

const auth = async (token) => {
  const { access_token } = await getAccessToken();

  return fetch(`${loginUri}`, {
    headers: {
      Authorization : `Bearer ${ token ? token : access_token }`,
    }
  });
};

exports.login = async ()  => {
  const response = await auth();
  return response.json();
}


exports.api = async (endpoint, token)  => {
  const response = await connect(endpoint, token);
  return response.json();
}
