const {
  selectArticleById,
  updateArticleById,
  selectArticles,
} = require("../models/articles.models");
const { checkArticleExists } = require("../utils/utils");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  return checkArticleExists(articleId)
    .then((exists) => {
      if (exists) {
        return selectArticleById(articleId).then((article) => {
          return res.status(200).send({ article });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  const articleBody = req.body.inc_votes;
  return checkArticleExists(articleId)
    .then((exists) => {
      if (exists) {
        return updateArticleById(articleId, articleBody).then((result) => {
          return res.status(201).send({ result });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const querySort = req.query.sort_by;
  const queryOrder = req.query.order_by;

  return selectArticles(querySort, queryOrder)
    .then((articles) => {
      if (articles) {
        res.status(200).send({ articles });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
