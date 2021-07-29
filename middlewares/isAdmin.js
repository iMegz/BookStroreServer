const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const access = req.authorization.access;
  if (access) next();
  else {
    const error = {
      ErrorCode: "FORBIDDEN",
      ErrorData: "FORBIDDEN",
      StatusCode: 403,
    };
    next(error);
  }
};
