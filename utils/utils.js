const db = require("../db/connection");

exports.checkArticleExists = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkAuthorExists = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkTopicExists = (inputTopic) => {
  return db.query("SELECT topic FROM articles").then((topics) => {
    if (!inputTopic) {
      return true;
    } else {
      return topics.rows.some((eachTopic) => {
        if (eachTopic.topic === inputTopic) {
          return true;
        } else {
          return false;
        }
      });
    }
  });
};

exports.checkTopicType = (inputTopic) => {
  if (!inputTopic) {
    return true;
  } else {
    if (typeof inputTopic === "String") {
      return true;
    } else {
      return false;
    }
  }
};
