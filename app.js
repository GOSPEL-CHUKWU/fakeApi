import cors from 'cors';
import express from 'express';
import RSSParser from 'rss-parser';
const PORT = process.env.PORT || 4000;

const mediumUrl = 'https://medium.com/feed/@fitnessspace.ng';

const parser = new RSSParser();
let articles = [];

// const parse = async url => {
//   try {
//     const feed = await parser.parseURL(url);
//     console.log(feed)
//     articles.push(feed)
//     // feed.items.map(item => {
//       // articles.push({ item });
//     // });
//   } catch (err) {
//     console.log(err.message);
//     throw err;
//   }
// };

const CACHE_TIME = 60 * 60 * 1000; // 1 hour
let lastFetchTime = 0;

const parse = async url => {
  try {
    const currentTime = new Date().getTime();
    // Check if it's been more than CACHE_TIME milliseconds since the last fetch
    if (currentTime - lastFetchTime > CACHE_TIME) {
      const feed = await parser.parseURL(url);
      feed.items.forEach(item => {
        articles.push({ item });
      });
      lastFetchTime = currentTime; // Update the last fetch time
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

let app = express();
app.use(cors());

app.get('/', async (req, res) => {
  await parse(mediumUrl);
  res.send(articles);
});

const server = app.listen(PORT, () => {
  console.log('App is listening at http://localhost:4000');
});

export default server;
