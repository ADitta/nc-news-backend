const express = require("express");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:username", getUserByUsername);

module.exports = usersRouter;
