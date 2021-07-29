const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authorization = decoded;
    next();
  } catch (err) {
    let error;
    if (err instanceof jwt.TokenExpiredError) {
      error = {
        ErrorCode: "SESSION_EXPIRED",
        ErrorData: "SESSION_EXPIRED",
        StatusCode: 401,
      };
    } else {
      error = {
        ErrorCode: "INVALID_TOKEN",
        ErrorData: "INVALID_TOKEN",
        StatusCode: 401,
      };
    }
    next(error);
  }
  if (!decoded) {
    const error = {
      ErrorCode: "UNAUTHORIZED",
      ErrorData: decoded,
      StatusCode: 401,
    };
    next(error);
  }
};
