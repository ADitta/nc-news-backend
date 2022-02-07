const express = require("express");
const { getTopics } = require("../controllers/topics.controllers");
const {
  getArticles,
  postArticle,
} = require("../controllers/articles.controller");
const { getUsers } = require("../controllers/users.controllers");
const apiRouter = express.Router();

const articlesRouter = require("./article.router");
const usersRouter = require("./users.router");
const commentsRouter = require("./comments.router");

apiRouter.get("/topics", getTopics);

apiRouter.get("/articles", getArticles);
apiRouter.post("/articles", postArticle);
apiRouter.use("/articles", articlesRouter);

apiRouter.get("/users", getUsers);
apiRouter.use("/users", usersRouter);

apiRouter.use("/comments", commentsRouter);
module.exports = apiRouter;
