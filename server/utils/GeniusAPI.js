const querystring = require('querystring');
const fetch = require('node-fetch');

// const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];


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

const scrapeLyrics = async (geniusUrl) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.emulate(iPhone);
  await page.goto(geniusUrl);

  const content = await page.content();

  const $ = cheerio.load(content);
  const lyrics = $('.lyrics').text();

  return lyrics;
}


exports.api = async (endpoint)  => {
  const response = await connect(endpoint);
  return response.json();
}

exports.getSongLyrics = async (url) => {
  return response = await scrapeLyrics(url);
}
