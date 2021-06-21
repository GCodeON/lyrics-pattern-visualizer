const fetch           = require('node-fetch');
const cheerio         = require('cheerio');
const puppeteerExtra  = require('puppeteer-extra');
const puppeteer       = require('puppeteer');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppeteerExtra.use(AdblockerPlugin());

const basic          = Buffer.from(`${process.env.GENIUS_CLIENT_ID}:${process.env.GENIUS_CLIENT_SECRET}`).toString('base64');
const API            = 'https://api.genius.com';
const TOKEN_ENDPOINT = `https://api.genius.com/oauth/token`;

const connect = async (endpoint) => {
  return fetch(`${API}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_CLIENT_ACCESS_TOKEN}`,
    },
  });
};

const scrapeLyrics = async (geniusUrl) => {

  const browser = await puppeteerExtra.launch();
  const page = await browser.newPage();

  await page.emulate(puppeteer.devices['iPhone 6']);
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

exports.getLyrics = async (url) => {
  return response = await scrapeLyrics(url);
}
