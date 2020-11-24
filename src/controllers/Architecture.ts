import express from 'express';

import ArticleModel from '../models/ArticleModel';
import getItemsPage  from '../utils/getItemsPage';
import '../core/db';

class ArchitectureController {
  index = async (req: express.Request, res: express.Response) => {
    try {
      let articles = await ArticleModel.find({category: 'architecture'}).exec();
      //page size
      let count: number;
      //current page
      let page: number;

      if (!req.query.count) {
        count = 10;
      } else {
        count = +req.query.count;
      }

      if (!req.query.page) {
        page = 1;
      } else {
        page = +req.query.page
      }

      if (count > 100) count = 100;

      const totalCount: number = Math.ceil(articles.length / count);

      if (page > totalCount) page = totalCount;

      articles = getItemsPage(articles, count, page);

      res.json({
        status: "success",
        data: articles,
        totalCount: totalCount
      });
    } catch (error) {
      res.send({
        status: "fail",
        message: JSON.stringify(error)
      });
    }
  }
}

module.exports = ArchitectureController();
