const {
  selectArticleById,
  updateArticleById,
  selectArticles,
  selectCommentsByArticleId,
  createCommentByArticleId,
} = require("../models/articles.models");
const {
  checkArticleExists,
  checkTopicExists,
  checkAuthorExists,
} = require("../utils/utils");

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
  const queryTopic = req.query.topic;

  return checkTopicExists(queryTopic)
    .then((exists) => {
      if (exists) {
        return selectArticles(querySort, queryOrder, queryTopic).then(
          (articles) => {
            res.status(200).send({ articles });
          }
        );
      } else {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  return checkArticleExists(articleId)
    .then((exists) => {
      if (exists) {
        return selectCommentsByArticleId(articleId).then((comments) => {
          return res.status(200).send({ comments });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const username = req.body.username;
  const body = req.body.body;
  return checkArticleExists(articleId)
    .then((exists) => {
      if (exists) {
        return checkAuthorExists(username).then((exists) => {
          if (exists) {
            return createCommentByArticleId(username, body, articleId).then(
              (comment) => {
                return res.status(201).send({ comment });
              }
            );
          } else {
            return Promise.reject({ status: 404, msg: "Not found" });
          }
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
