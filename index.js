// FIRST 10 IMG FROM WEBSITE URL: https://memegen-link-examples-upleveled.netlify.app/

import axios from 'axios';
import * as cheerio from 'cheerio';

// import puppeteer from 'puppeteer'; // not needed?

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// axios (to get html), cheerio to parse html:

const response = await axios.get(url); // go to page
const $ = cheerio.load(response.data); // load data on page
const imgSrc = $('section img').attr('src'); // get first src attribute from img inside section

console.log(imgSrc);
