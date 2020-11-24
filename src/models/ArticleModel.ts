const { model, Schema, Document } = require('mongoose');

export interface Article extends Document {
  category: string
  title: string
  description: string
  images: Array<string>
}

const ArticleShema = new Schema({
  category: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  images: {
    type: [String],
    require: true
  }
});

const ArticleModel = model<Article>('Article', ArticleShema);

module.exports = ArticleModel;
