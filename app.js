import cors from 'cors';
import express from 'express';
import RSSParser from 'rss-parser';
const PORT = process.env.PORT || 4000;

const mediumUrl = 'https://medium.com/feed/@fitnessspace.ng';

const parser = new RSSParser();

let app = express();
app.use(cors());

app.get('/', async (req, res) => {
  let articles = [];
  try {
    const feed = await parser.parseURL(mediumUrl);
    feed.items.map(item => {
      articles.push({ item });
    });
    res.send(articles);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
});

const server = app.listen(PORT, () => {
  console.log(`App is listening at localhost:${PORT}`);
});

export default server;
