const Users = require("../models/userToken");

function authMiddleware(req, res, next) {
  const token = req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const allUsers = Users.all();
  const isValid = allUsers.some((user) => user.token === token);

  if (!isValid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

module.exports = authMiddleware;
