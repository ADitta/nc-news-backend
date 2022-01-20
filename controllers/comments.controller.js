const { removeCommentByCommentId } = require("../models/comments.models");
const {} = require("../utils/utils");

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
