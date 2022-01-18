const express = require("express");

const articlesRouter = express.Router();
const articles_idRouter = require("./article_id.router");

articlesRouter.get("/", getArticle);

articlesRouter.use("/:article_id", articles_idRouter);

articlesRouter;
module.exports = articlesRouter;
