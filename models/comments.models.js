const db = require("../db/connection");

exports.removeCommentByCommentId = (commentId) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING * `, [
      commentId,
    ])
    .then((comment) => {
      return comment.rows[0];
    });
};

exports.updateCommentById = (commentId, voteChange) => {
  return db
    .query(
      `UPDATE comments
      SET votes = votes + $2 WHERE comment_id = $1 RETURNING * `,
      [commentId, voteChange]
    )
    .then((result) => {
      return result.rows[0];
    });
};
