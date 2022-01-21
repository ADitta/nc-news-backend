const {
  removeCommentByCommentId,
  updateCommentById,
} = require("../models/comments.models");
const { checkCommentExists } = require("../utils/utils");

exports.deleteCommentByCommentId = (req, res, next) => {
  const commentId = req.params.comment_id;

  return removeCommentByCommentId(commentId)
    .then((comment) => {
      return res.status(204).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentById = (req, res, next) => {
  const commentId = req.params.comment_id;
  const voteChange = req.body.inc_votes;
  return checkCommentExists(commentId)
    .then((exists) => {
      if (exists) {
        return updateCommentById(commentId, voteChange).then((comment) => {
          return res.status(201).send({ comment });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
