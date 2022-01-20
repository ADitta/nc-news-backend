const db = require("../db/connection");

exports.selectArticleById = (articleId) => {
  return db
    .query(
      `SELECT articles.*, COUNT (comments.comment_id) AS comment_count
    FROM articles JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [articleId]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateArticleById = (articleId, articleBody) => {
  return db
    .query(
      `UPDATE articles 
      SET votes = votes + $2 WHERE article_id = $1 RETURNING * `,
      [articleId, articleBody]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.selectArticles = (
  querySort = "created_at",
  queryOrder = "DESC",
  queryTopic
) => {
  let thereIsTopic = false;
  if (!queryTopic) {
    thereIsTopic = true;
  }
  const allowedSortBy = [
    "article_id",
    "title",
    "body",
    "votes",
    "author",
    "topic",
    "created_at",
    "comment_count",
  ];

  if (!allowedSortBy.includes(querySort)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const allowedOrder = ["ASC", "DESC", "asc", "desc"];
  if (!allowedOrder.includes(queryOrder)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
        FROM articles
        INNER JOIN comments
        ON articles.article_id = comments.article_id
        WHERE ${thereIsTopic} OR topic = $1
        GROUP BY articles.article_id
        ORDER BY ${querySort} ${queryOrder};`,
      [queryTopic]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectCommentsByArticleId = (articleId) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments
    WHERE article_id = $1;`,
      [articleId]
    )
    .then((comments) => {
      return comments.rows;
    });
};

exports.createCommentByArticleId = (username, body, articleId) => {
  return db
    .query(
      `INSERT INTO comments
  (author, body, article_id)
  VALUES($1,$2,$3) RETURNING *;`,
      [username, body, articleId]
    )
    .then((comment) => {
      return comment.rows[0];
    });
};
