const express = require("express");
const {
  deleteCommentByCommentId,
  patchCommentById,
} = require("../controllers/comments.controller");
const commentsRouter = express.Router();

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentByCommentId)
  .patch(patchCommentById);
module.exports = commentsRouter;
