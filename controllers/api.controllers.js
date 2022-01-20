const fs = require("fs");

exports.getApi = (req, res) => {
  return fs.readFile("endpoints.json", "utf-8", (err, contents) => {
    return res.status(200).send(JSON.parse({ contents }));
  });
};
