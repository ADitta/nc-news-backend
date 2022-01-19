const express = require("express");
const { getArticleById } = require("../controllers/articles.controller");

const articles_idRouter = express.Router();

// articles_idRouter
//   .route("/comments")
//   .get(getCommentsByArticleId)
//   .post(postCommentsByArticleId);

module.exports = articles_idRouter;
