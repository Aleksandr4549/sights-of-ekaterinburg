const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const ArticleController =  require('./src/controllers/Article.ts');
const ArchitectureController = require('./src/controllers/Architecture.ts');
const StreetArtsController = require('./src/controllers/StreetArts.ts');

const path = require('path');

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

app.get('/articles', ArticleController.index);
app.get('/article/:id', ArticleController.show);
app.get('/architecture', ArchitectureController.index);
app.get('/street-arts', StreetArtsController.index);

app.listen(8080, () => {
  console.log(`Server started: port ${process.env.PORT || 8080}`);
});
