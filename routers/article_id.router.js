const express = require("express");

const articles_idRouter = express.Router();

articles_idRouter.route("/").get(getArticleById).patch(patchArticleById);

articles_idRouter
  .route("/comments")
  .get(getCommentsByArticleId)
  .post(postCommentsByArticleId);

module.exports = articles_idRouter;
