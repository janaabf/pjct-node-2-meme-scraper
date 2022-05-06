// THIS CODE FINDS AND DOWNLOADS FIRST 10 IMG FROM WEBSITE URL: https://memegen-link-examples-upleveled.netlify.app/

// used libraries
import fs from 'node:fs';
import https from 'node:https';
import axios from 'axios';
import * as cheerio from 'cheerio';

// source
const memePage = 'https://memegen-link-examples-upleveled.netlify.app/';

// (axios to) get html, (cheerio to) parse html:
const response = await axios.get(memePage); // go to page
const $ = cheerio.load(response.data); // load data on page
const html = $(`img`).html('src'); // get first src attribute from img

// push first 10 image urls to array:
const memeUrls = [];

for (let i = 0; i <= 9; i++) {
  memeUrls.push(html[i].attribs.src);
}

// OPTIONAL: CONSOLE LOG FOUND LINKS:
// console.log('> Found following image URLs for download:' + memeUrls);

// access folder, or create new one, if it doesn't exist already
const path = './memes';

fs.access(path, (error) => {
  if (error) {
    fs.mkdir(path, (err) => {
      if (err) {
        console.log('> something went wrong!');
      } else {
        console.log('> directory created successfully!');
      }
    });
  } else {
    console.log('> directory found');
  }
});

// create download function
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`),
        );
      }
    });
  });
}

// download and save each image from memeUrls
for (let i = 0; i < memeUrls.length; i++) {
  if (i < 9) {
    downloadImage(memeUrls[i], `./memes/0${i + 1}.jpg`)
      .then(console.log(`downloaded image ${i + 1}`))
      .catch(console.error);
  } else {
    downloadImage(memeUrls[i], `./memes/${i + 1}.jpg`)
      .then(console.log(`downloaded image ${i + 1}`))
      .catch(console.error);
  }
}
