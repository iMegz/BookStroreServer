const { validationResult } = require("express-validator");
const { deleteFile } = require("../utils/utils");
module.exports = (req, res, next) => {
  const validate = validationResult(req);
  if (validate.isEmpty()) next();
  else {
    if (req.file.filename) deleteFile(req.uploadFolder, req.file.filename);
    const error = {
      ErrorCode: "INVALID_INPUT",
      StatusCode: 400,
      ErrorData: validate.array(),
    };
    next(error);
  }
};
