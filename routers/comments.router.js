const express = require("express");
const {
  deleteCommentByCommentId,
} = require("../controllers/comments.controller");
const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteCommentByCommentId);
// .patch(patchCommentById);
module.exports = commentsRouter;
