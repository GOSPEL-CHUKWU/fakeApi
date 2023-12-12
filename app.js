import cors from 'cors';
import express from 'express';
import RSSParser from 'rss-parser';
const PORT = process.env.PORT || 4000;

const mediumUrl = 'https://medium.com/feed/@fitnessspace.ng';

const parser = new RSSParser();
let articles = [];

const parse = async url => {
  const feed = await parser.parseURL(url);
  feed.items.forEach(item => {
    articles.push({ item });
  });
};
parse(mediumUrl);

let app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send(articles);
});

const server = app.listen(PORT, () => {
  console.log('App is listening at http://localhost:4000');
});

export default server;
