const { selectUsers, selectUserById } = require("../models/users.models");
const { checkUserExists } = require("../utils/utils");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      if (users) {
        res.status(200).send({ users });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  return checkUserExists(username)
    .then((exists) => {
      if (exists) {
        return selectUserById(username).then((user) => {
          return res.status(200).send({ user });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
