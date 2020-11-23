import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';

import ArticleController from './controllers/Article';
import ArchitectureController from './controllers/Architecture';
import StreetArtsController from './controllers/StreetArts';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.get('/articles', ArticleController.index);
app.get('/article/:id', ArticleController.show);
app.get('/architecture', ArchitectureController.index);
app.get('/street-arts', StreetArtsController.index);

app.listen(process.env.PORT || 5000, (): void => {
  console.log(`Server started: port ${process.env.PORT || 8080}`);
});