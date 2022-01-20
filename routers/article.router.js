const express = require("express");
const {
  getArticleById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentsByArticleId,
} = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentsByArticleId);

articlesRouter;
module.exports = articlesRouter;
