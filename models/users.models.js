const db = require("../db/connection");

exports.selectUsers = () => {
  return db.query(`SELECT username FROM users`).then((result) => {
    return result.rows;
  });
};

exports.selectUserById = (username) => {
  return db
    .query(
      `SELECT * FROM users
      WHERE username = $1;`,
      [username]
    )
    .then((result) => {
      return result.rows[0];
    });
};
