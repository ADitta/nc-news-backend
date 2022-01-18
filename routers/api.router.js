const express = require("express");
const { getTopics } = require("../controllers/topics.controllers");

const apiRouter = express.Router();

// const articlesRouter = require("./article.router");
// const usersRouter = require("./users.router");
// const commentsRouter = require("./comments.router");

// apiRouter.get("/", getApi);

apiRouter.get("/topics", getTopics);

// apiRouter.use("/articles", articlesRouter);

// apiRouter.use("/users", usersRouter);

// apiRouter.use("/comments", commentsRouter);
module.exports = apiRouter;
