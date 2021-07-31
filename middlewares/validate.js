const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  const validate = validationResult(req);
  if (validate.isEmpty()) next();
  else {
    const error = {
      ErrorCode: "INVALID_INPUT",
      StatusCode: 400,
      ErrorData: validate.array(),
    };
    next(error);
  }
};
