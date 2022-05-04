// FIRST 10 IMG FROM WEBSITE URL: https://memegen-link-examples-upleveled.netlify.app/

import axios from 'axios';
import * as cheerio from 'cheerio';

// import puppeteer from 'puppeteer'; // not needed?

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// axios (to get html), cheerio to parse html:

const response = await axios.get(url); // go to page
const $ = cheerio.load(response.data); // load data on page
const html = $(`img`).html('src'); // get first src attribute from img

// push first 10 image urls to array:

const loopArray = [];

for (let i = 0; i <= 9; i++) {
  loopArray.push(html[i].attribs.src);
}

console.log(loop);

/* LOOP WITH LINKS WITHOUT ARRAY:

for (let i = 0; i <= 9; i++) {
  console.log(html[i].attribs.src);
} */
