import express from 'express';

import ArticleModel from '../models/ArticleModel';
import '../core/db';

class ArticleController {
  index = async (_: express.Request, res: express.Response) => {
    try {
      const articles = await ArticleModel.find({}).exec();

      res.json({
        status: "success",
        data: articles 
      });
    } catch (error) {
      res.send({
        status: "fail",
        message: JSON.stringify(error)
      });
    }
  }

  show = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    ArticleModel.findOne({_id: id}, (err, article) => {
      if (err) {
        return res.status(404).json({
          message: "article not found"
        });
      }

      res.json(article);
    });
  }
}

export default new ArticleController();
