const express = require("express");
const articles_idRouter = require("./article_id.router");
const {
  getArticleById,
  patchArticleById,
} = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

// articlesRouter.use("/:article_id", articles_idRouter);

articlesRouter;
module.exports = articlesRouter;
