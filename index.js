// FIRST 10 IMG FROM WEBSITE URL: https://memegen-link-examples-upleveled.netlify.app/

import fs from 'node:fs';
import https from 'node:https';
import axios from 'axios';
import * as cheerio from 'cheerio';

const memePage = 'https://memegen-link-examples-upleveled.netlify.app/';

// axios (to get html), cheerio to parse html:

const response = await axios.get(memePage); // go to page
const $ = cheerio.load(response.data); // load data on page
const html = $(`img`).html('src'); // get first src attribute from img

// push first 10 image urls to array:

const memeUrls = [];

for (let i = 0; i <= 9; i++) {
  memeUrls.push(html[i].attribs.src);
}

// const file1 = html[0].attribs['src'];

console.log(memeUrls);

// create folder

/* EXPLANATION OF CODE BELOW:

Source: https://www.geeksforgeeks.org/how-to-create-a-directory-using-node-js/

checks for errors while creating new directory (1st error directory already exists; 2nd error directory wasn't able to be created)

1)  access file system, try to find path.
2)  if path found --> access path & 'directory found'
3)  if path not found --> error1, create a new directory & message 'directory created successfully'
4)   if could not create new directory --> error2, throw error & message 'something went wrong!' */

const path = './memes';

fs.access(path, (error) => {
  // 1)
  if (error) {
    fs.mkdir(path, (err) => {
      if (err) {
        console.log('something went wrong!'); // 4)
      } else {
        console.log('directory created successfully!'); // 3)
      }
    });
  } else {
    console.log('directory found'); // 2)
  }
});

// create download function: https://scrapingant.com/blog/download-image-javascript

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

// download and save each image from memeUrl

for (let i = 0; i < memeUrls.length; i++) {
  if (i < 9) {
    downloadImage(memeUrls[i], `./memes/0${i + 1}.jpg`)
      .then(console.log)
      .catch(console.error);
  } else {
    downloadImage(memeUrls[i], `./memes/${i + 1}.jpg`)
      .then(console.log)
      .catch(console.error);
  }
}

// ----------------------------alt code & notes---------------------------

/*
    LOOP WITH LINKS WITHOUT ARRAY:

for (let i = 0; i <= 9; i++) {
  console.log(html[i].attribs.src);
}


    DOWNLOAD IMAGE

(not working)
------ vs 1



async function download() {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`./memes/01.jpg`, buffer, () =>
    console.log('finished downloading!'),
  );
}

download(file1);

------ vs 2

fs.writeFile('./memes/01.jpg', file1, (error) => {
    if (error) {
      console.log('something with the file did not work');
    } else {
      console.log(`Following Image was Downloaded: ${file1}`);
    }
  });

------

const downloadImg = (url, filename) => {
  let client = http;
  if (url.toString().indexOf('https') === 0) {
    client = https;
  }
  client
    .request(url, function (response) {
      var data = new Stream();

      response.on('data', function (chunk) {
        data.push(chunk);
      });

      response.on('end', function () {
        fs.writeFileSync(filename, data.read());
      });
    })
    .end();
};

downloadImg(file1, '../memes/01.jpg');

-----

function saveImage(url, localPath) {
  const file = fs.createWriteStream(localPath);
  const request = https.get(url, function (response1) {
    response1.pipe(file);
  });
}

exports.saveImage(req, res) {
  let image_path='../memes/01.jpg'+'.jpg';
  fetchImage(req.body.profile_pic_url,image_path);
  }


/* async function download() {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`./memes/01.jpg`, buffer, () =>
    console.log('finished downloading!'),
  );
}
for (let i = 0; i <= 9; i++) {
  download(memeUrls[i]);
}

// -----------

// saveImage(
//   'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
//   './memes/01.jpg',
// );

*/
